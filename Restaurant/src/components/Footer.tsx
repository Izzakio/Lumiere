import { ArrowUp, MapPin, Phone } from "lucide-react";

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const nav = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Menu", href: "#menu" },
  { label: "Chef", href: "#chef" },
  { label: "Galeri", href: "#galeri" },
  { label: "Reservasi", href: "#reservasi" },
];

const socials = [
  { icon: InstagramIcon, label: "Instagram" },
  { icon: FacebookIcon, label: "Facebook" },
  { icon: XIcon, label: "X / Twitter" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/10 bg-coal">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 lg:px-10">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <a href="#beranda" className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-medium tracking-[0.28em] text-cream">
                LUMIÈRE
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            </a>
            <p className="mt-6 max-w-xs text-sm leading-relaxed font-light text-cream/50">
              Pengalaman fine dining kelas dunia di jantung Jakarta — tempat
              tradisi Perancis bertemu kekayaan rasa Nusantara sejak 2009.
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#beranda"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center border border-cream/15 text-cream/60 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink"
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-[11px] font-medium tracking-[0.35em] text-gold uppercase">
              Navigasi
            </h4>
            <ul className="mt-6 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm font-light text-cream/55 transition-colors duration-300 hover:text-gold"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-medium tracking-[0.35em] text-gold uppercase">
              Kontak
            </h4>
            <ul className="mt-6 space-y-4 text-sm font-light text-cream/55">
              <li className="flex gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-gold/70" />
                Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan 12190
              </li>
              <li className="flex gap-3">
                <Phone size={15} className="mt-0.5 shrink-0 text-gold/70" />
                +62 21 2751 8888
              </li>
              <li className="flex gap-3">
                <Phone size={15} className="mt-0.5 shrink-0 text-gold/70" />
                reservasi@lumiere.id
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[11px] font-medium tracking-[0.35em] text-gold uppercase">
              Jam Buka
            </h4>
            <ul className="mt-6 space-y-3 text-sm font-light text-cream/55">
              <li className="flex justify-between gap-4 border-b border-cream/8 pb-3">
                <span>Selasa – Minggu</span>
                <span className="text-cream/80">17.00 – 23.00</span>
              </li>
              <li className="flex justify-between gap-4 border-b border-cream/8 pb-3">
                <span>Senin</span>
                <span className="text-gold italic">Tutup</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Private Dining</span>
                <span className="text-cream/80">Dengan Reservasi</span>
              </li>
            </ul>
            <a
              href="#reservasi"
              className="mt-7 inline-flex border border-gold/60 px-6 py-3 text-[10px] font-light tracking-[0.28em] text-gold uppercase transition-all duration-400 hover:bg-gold hover:text-ink"
            >
              Reservasi Sekarang
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-cream/8 pt-8 sm:flex-row">
          <p className="text-[11px] font-light tracking-[0.15em] text-cream/35">
            © 2025 Lumière Fine Dining. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-[10px] font-light tracking-[0.3em] text-cream/25 uppercase">
            Crafted with Passion in Jakarta
          </p>
          <div className="flex items-center gap-5">
            <a href="#admin" className="text-[10px] text-cream/35 transition-colors hover:text-gold">
              Admin Reservasi
            </a>
            <a
              href="#beranda"
              aria-label="Kembali ke atas"
              className="flex h-10 w-10 items-center justify-center border border-cream/15 text-cream/60 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink"
            >
              <ArrowUp size={15} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
