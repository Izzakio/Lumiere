import { useState, type FormEvent } from "react";
import { ArrowLeft, LogOut, RefreshCw } from "lucide-react";
import type { ReservationRecord } from "../types/reservation";
import { getReservationApiUrl } from "../utils/reservationApi";

const inputCls =
  "w-full border border-cream/15 bg-white/[0.03] px-4 py-3.5 text-sm font-light text-cream placeholder:text-cream/30 outline-none transition-all duration-300 focus:border-gold/70";

function isReservationRecord(value: unknown): value is ReservationRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string" &&
    "createdAt" in value &&
    typeof value.createdAt === "string" &&
    "name" in value &&
    typeof value.name === "string" &&
    "phone" in value &&
    typeof value.phone === "string" &&
    "date" in value &&
    typeof value.date === "string" &&
    "time" in value &&
    typeof value.time === "string" &&
    "guests" in value &&
    typeof value.guests === "number" &&
    "notes" in value &&
    typeof value.notes === "string"
  );
}

function displayDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date(`${value}T00:00:00`));
}

export default function AdminReservations() {
  const [token, setToken] = useState("");
  const [reservations, setReservations] = useState<ReservationRecord[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadReservations = async (adminToken: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(getReservationApiUrl(), {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const payload: unknown = await response.json();

      if (!response.ok) {
        const message =
          typeof payload === "object" && payload !== null && "error" in payload &&
          typeof payload.error === "string"
            ? payload.error
            : "Daftar reservasi gagal dimuat.";
        throw new Error(message);
      }

      if (
        typeof payload !== "object" ||
        payload === null ||
        !("reservations" in payload) ||
        !Array.isArray(payload.reservations) ||
        !payload.reservations.every(isReservationRecord)
      ) {
        throw new Error("Respons server tidak valid.");
      }

      setReservations(payload.reservations);
      setToken(adminToken);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Terjadi kesalahan saat memuat reservasi.",
      );
      setReservations(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    void loadReservations(String(formData.get("token") ?? ""));
  };

  const handleLogout = () => {
    setToken("");
    setReservations(null);
    setError("");
  };

  return (
    <main className="min-h-screen bg-ink px-6 py-12 text-cream md:px-10">
      <div className="mx-auto max-w-5xl">
        <a href="#beranda" className="inline-flex items-center gap-2 text-sm text-cream/55 hover:text-gold">
          <ArrowLeft size={16} />
          Kembali ke situs
        </a>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-gold uppercase">Lumière · Admin</p>
            <h1 className="mt-3 font-serif text-4xl">Daftar Reservasi</h1>
          </div>
          {reservations && (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => void loadReservations(token)}
                disabled={loading}
                className="inline-flex items-center gap-2 border border-cream/20 px-4 py-2 text-xs text-cream/70 hover:border-gold hover:text-gold disabled:opacity-50"
              >
                <RefreshCw size={14} />
                Muat ulang
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 border border-cream/20 px-4 py-2 text-xs text-cream/70 hover:border-gold hover:text-gold"
              >
                <LogOut size={14} />
                Keluar
              </button>
            </div>
          )}
        </div>

        {reservations === null ? (
          <form
            onSubmit={handleLogin}
            className="mt-10 max-w-md space-y-4 border border-gold/20 bg-coal/70 p-7"
          >
            <label className="block text-sm text-cream/70" htmlFor="admin-token">
              Token admin
            </label>
            <input
              id="admin-token"
              name="token"
              type="password"
              autoComplete="current-password"
              required
              className={inputCls}
              placeholder="Masukkan token admin"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold px-5 py-3 text-xs tracking-[0.2em] text-ink uppercase disabled:opacity-50"
            >
              {loading ? "Memuat..." : "Masuk"}
            </button>
          </form>
        ) : (
          <div className="mt-10">
            <p className="mb-5 text-sm text-cream/50">
              Menampilkan {reservations.length} reservasi terbaru (maksimal 100).
            </p>
            {reservations.length === 0 ? (
              <div className="border border-cream/10 p-8 text-center text-cream/50">
                Belum ada reservasi masuk.
              </div>
            ) : (
              <div className="space-y-4">
                {reservations.map((reservation) => (
                  <article
                    key={reservation.id}
                    className="grid gap-4 border border-cream/10 bg-coal/60 p-6 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    <div>
                      <h2 className="font-serif text-xl text-gold">{reservation.name}</h2>
                      <a className="mt-1 block text-sm text-cream/65 hover:text-gold" href={`tel:${reservation.phone}`}>
                        {reservation.phone}
                      </a>
                    </div>
                    <div className="text-sm leading-relaxed text-cream/70">
                      <p>{displayDate(reservation.date)} · {reservation.time} WIB</p>
                      <p>{reservation.guests} tamu</p>
                    </div>
                    <div className="text-sm text-cream/55">
                      <p className="text-[10px] tracking-[0.2em] text-gold/80 uppercase">Permintaan khusus</p>
                      <p className="mt-1 whitespace-pre-wrap">{reservation.notes || "-"}</p>
                    </div>
                    <p className="text-xs text-cream/35 sm:col-span-2 lg:col-span-3">
                      Diterima {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(reservation.createdAt))}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {error && (
          <p role="alert" className="mt-5 border border-red-400/30 bg-red-400/5 p-4 text-sm text-red-200">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
