import { randomUUID, timingSafeEqual } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { ReservationRecord, ReservationSubmission } from "../src/types/reservation";

type VercelRequest = IncomingMessage & { body?: unknown };
type VercelResponse = ServerResponse & {
  status(code: number): VercelResponse;
  json(body: unknown): VercelResponse;
};

const redisKey = "lumiere:reservations";
const reservationTimes = new Set([
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
]);

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getAllowedOrigins() {
  return (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function setCorsHeaders(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;
  const allowedOrigins = getAllowedOrigins();

  if (allowedOrigins.length === 0) {
    return false;
  }

  if (typeof origin === "string" && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  } else if (origin) {
    return false;
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Max-Age", "86400");
  return true;
}

function redisConfiguration() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("Reservation storage is not configured.");
  }

  return { url, token };
}

async function redisCommand(command: Array<string | number>) {
  const { url, token } = redisConfiguration();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!response.ok) {
    throw new Error(`Reservation storage returned ${response.status}.`);
  }

  const payload: unknown = await response.json();
  if (!isObject(payload) || payload.error) {
    throw new Error("Reservation storage returned an invalid response.");
  }

  return payload.result;
}

function validateSubmission(value: unknown): ReservationSubmission | null {
  if (!isObject(value)) {
    return null;
  }

  const { name, phone, date, time, guests, notes, website } = value;
  if (typeof website === "string" && website.trim()) {
    return null;
  }

  const parsedDate = typeof date === "string" ? new Date(`${date}T00:00:00.000Z`) : null;
  const todayInJakarta = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.trim().length > 120 ||
    typeof phone !== "string" ||
    !/^[+\d().\-\s]{6,30}$/.test(phone.trim()) ||
    typeof date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !parsedDate ||
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== date ||
    date < todayInJakarta ||
    typeof time !== "string" ||
    !reservationTimes.has(time) ||
    typeof guests !== "number" ||
    !Number.isInteger(guests) ||
    guests < 1 ||
    guests > 8 ||
    typeof notes !== "string" ||
    notes.length > 1000
  ) {
    return null;
  }

  return {
    name: name.trim(),
    phone: phone.trim(),
    date,
    time,
    guests,
    notes: notes.trim(),
  };
}

function parseReservationRecord(value: string): ReservationRecord {
  const parsed: unknown = JSON.parse(value);
  if (
    !isObject(parsed) ||
    typeof parsed.id !== "string" ||
    typeof parsed.createdAt !== "string" ||
    typeof parsed.name !== "string" ||
    typeof parsed.phone !== "string" ||
    typeof parsed.date !== "string" ||
    typeof parsed.time !== "string" ||
    typeof parsed.guests !== "number" ||
    typeof parsed.notes !== "string"
  ) {
    throw new Error("Reservation storage contains an invalid record.");
  }

  return {
    id: parsed.id,
    createdAt: parsed.createdAt,
    name: parsed.name,
    phone: parsed.phone,
    date: parsed.date,
    time: parsed.time,
    guests: parsed.guests,
    notes: parsed.notes,
  };
}

function hasValidAdminToken(req: VercelRequest) {
  const configuredToken = process.env.RESERVATION_ADMIN_TOKEN;
  const authorization = req.headers.authorization;

  if (!configuredToken || typeof authorization !== "string" || !authorization.startsWith("Bearer ")) {
    return false;
  }

  const suppliedToken = Buffer.from(authorization.slice("Bearer ".length));
  const expectedToken = Buffer.from(configuredToken);
  return suppliedToken.length === expectedToken.length && timingSafeEqual(suppliedToken, expectedToken);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!setCorsHeaders(req, res)) {
    return res.status(403).json({ error: "Permintaan dari origin ini tidak diizinkan." });
  }

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method === "POST") {
    const submission = validateSubmission(req.body);
    if (!submission) {
      return res.status(400).json({ error: "Data reservasi tidak valid. Periksa kembali formulir." });
    }

    const reservation: ReservationRecord = {
      ...submission,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };

    try {
      await redisCommand(["HSET", redisKey, reservation.id, JSON.stringify(reservation)]);
      return res.status(201).json({ id: reservation.id });
    } catch (error) {
      console.error("Failed to save reservation:", error);
      return res.status(503).json({ error: "Reservasi belum tersimpan. Silakan coba lagi beberapa saat lagi." });
    }
  }

  if (req.method === "GET") {
    if (!process.env.RESERVATION_ADMIN_TOKEN) {
      return res.status(503).json({ error: "Dashboard admin belum dikonfigurasi." });
    }

    if (!hasValidAdminToken(req)) {
      return res.status(401).json({ error: "Token admin tidak valid." });
    }

    try {
      const values = await redisCommand(["HVALS", redisKey]);
      if (!Array.isArray(values)) {
        throw new Error("Reservation storage returned an invalid list.");
      }

      const serializedRecords = values.filter((value): value is string => typeof value === "string");
      if (serializedRecords.length !== values.length) {
        throw new Error("Reservation storage returned an invalid record.");
      }

      const reservations = serializedRecords
        .map(parseReservationRecord)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, 100);

      return res.status(200).json({ reservations });
    } catch (error) {
      console.error("Failed to read reservations:", error);
      return res.status(503).json({ error: "Daftar reservasi tidak dapat dimuat. Silakan coba lagi." });
    }
  }

  res.setHeader("Allow", "GET, POST, OPTIONS");
  return res.status(405).json({ error: "Metode permintaan tidak didukung." });
}
