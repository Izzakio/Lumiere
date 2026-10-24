const configuredApiUrl = import.meta.env.VITE_RESERVATION_API_URL?.trim();

export function getReservationApiUrl() {
  if (configuredApiUrl) {
    return new URL("/api/reservations", configuredApiUrl).toString();
  }

  if (window.location.hostname.endsWith(".github.io")) {
    throw new Error("Reservasi online sedang disiapkan. Silakan hubungi restoran melalui nomor kontak.");
  }

  return new URL("/api/reservations", window.location.origin).toString();
}
