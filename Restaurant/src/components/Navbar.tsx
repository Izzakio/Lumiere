import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu as MenuIcon, Phone, X } from "lucide-react";

const links = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Menu", href: "#menu" },
  { label: "Chef", href: "#chef" },
  { label: "Galeri", href: "#galeri" },
  { label: "Testimoni", href: "#testimoni" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-gold/10 bg-ink/90 py-3 backdrop-blur-xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#beranda" className="group flex items-baseline gap-2">
            <span className="font-serif text-xl font-medium tracking-[0.28em] text-cream md:text-2xl">
              LUMIÈRE
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-gold transition-transform duration-500 group-hover:rotate-[135deg]" />
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[11px] font-light tracking-[0.28em] text-cream/70 uppercase transition-colors duration-300 hover:text-cream"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-400 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#reservasi"
              className="hidden border border-gold/60 px-6 py-2.5 text-[11px] font-light tracking-[0.28em] text-gold uppercase transition-all duration-400 hover:bg-gold hover:text-ink lg:inline-flex"
            >
              Reservasi
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Buka menu"
              className="flex h-11 w-11 items-center justify-center border border-cream/20 text-cream transition-colors hover:border-gold hover:text-gold lg:hidden"
            >
              <MenuIcon size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/[0.985] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-serif text-xl tracking-[0.28em] text-cream">LUMIÈRE</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Tutup menu"
                className="flex h-11 w-11 items-center justify-center border border-cream/20 text-cream transition-colors hover:border-gold hover:text-gold"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-baseline gap-4 py-2"
                >
                  <span className="font-serif text-sm text-gold italic">0{i + 1}</span>
                  <span className="font-serif text-4xl font-light text-cream transition-colors duration-300 group-hover:text-gold sm:text-5xl">
                    {l.label}
                  </span>
                </motion.a>
              ))}
              <motion.a
                href="#reservasi"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 border border-gold px-10 py-4 text-xs font-light tracking-[0.3em] text-gold uppercase transition-all duration-400 hover:bg-gold hover:text-ink"
              >
                Reservasi Meja
              </motion.a>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col items-center gap-2 pb-10 text-center"
            >
              <p className="flex items-center gap-2 text-xs font-light tracking-[0.2em] text-cream/50">
                <Phone size={12} className="text-gold" /> +62 21 2751 8888
              </p>
              <p className="text-[10px] font-light tracking-[0.3em] text-cream/30 uppercase">
                Jl. Senopati No. 88 · Jakarta Selatan
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
