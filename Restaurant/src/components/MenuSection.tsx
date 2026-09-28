import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { assetPath } from "../utils/assetPath";

type Category = "Pembuka" | "Hidangan Utama" | "Dessert";

const menu: Record<Category, { name: string; desc: string; price: string }[]> = {
  Pembuka: [
    { name: "Oyster Royale", desc: "Kumis tiram segar, kaviar Ossetra, mignonette champagne.", price: "485.000" },
    { name: "Foie Gras Terrine", desc: "Terrine foie gras, brioche panggang hangat, fig compote.", price: "525.000" },
    { name: "Tartare Tuna", desc: "Yellowfin tuna, avokad, ponzu truffle, kuning telur puyuh.", price: "425.000" },
    { name: "Sup Lobster", desc: "Bisque lobster Boston, minyak tarragon, krem crème fraîche.", price: "395.000" },
  ],
  "Hidangan Utama": [
    { name: "Wagyu A5 Rossini", desc: "Wagyu A5 Miyazaki, foie gras, truffle Périgord, saus Madeira.", price: "1.250.000" },
    { name: "Hokkaido Scallop", desc: "Scallop bakar, krem safron, kaviar Ossetra, beurre blanc.", price: "685.000" },
    { name: "Lobster Thermidor", desc: "Lobster Boston utuh, krim cognac, gruyère, tarragon segar.", price: "975.000" },
    { name: "Kambing Herb Crust", desc: "Rack of lamb, kerak herbal pistachio, ratatouille Provence.", price: "825.000" },
    { name: "Bebek Betutu Royale", desc: "Bebek betutu 12 rempah, confit kaki, saus kolokasia.", price: "575.000" },
  ],
  Dessert: [
    { name: "Simfoni Cokelat 70%", desc: "Sphere cokelat single origin Jembrana, raspberry, daun emas.", price: "385.000" },
    { name: "Soufflé Grand Marnier", desc: "Soufflé hangat, es krim vanilla bourbon, saus jeruk manis.", price: "325.000" },
    { name: "Crème Brûlée", desc: "Vanila Madagaskar, karamel gula aren, tuile almond.", price: "285.000" },
    { name: "Mille-Feuille Nusantara", desc: "Puff pastry renyah, krem durian kawi, karamel pandan.", price: "295.000" },
  ],
};

const courses = [
  "Amuse-Bouche",
  "Oyster Royale",
  "Tartare Tuna",
  "Palate Cleanser",
  "Hokkaido Scallop",
  "Wagyu A5 Rossini",
  "Simfoni Cokelat",
];

const tabs = Object.keys(menu) as Category[];

export default function MenuSection() {
  const [tab, setTab] = useState<Category>("Pembuka");

  return (
    <section id="menu" className="relative overflow-hidden py-24 md:py-36">
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={assetPath("gallery-2.jpg")}
          alt=""
          className="h-full w-full object-cover opacity-[0.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gold" />
            <span className="text-[10px] font-light tracking-[0.45em] text-gold uppercase">
              Menu Kami
            </span>
            <span className="h-px w-12 bg-gold" />
          </div>
          <h2 className="mt-6 font-serif text-4xl leading-tight font-medium text-cream md:text-5xl lg:text-6xl">
            Pengalaman <span className="text-gold italic">Degustasi</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed font-light text-cream/50">
            Perjalanan tujuh babak yang dirangkai oleh dapur kami — atau pilih
            favorit Anda dari menu à la carte.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          {/* Degustasi card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative border border-gold/20 bg-ink/80 p-8 backdrop-blur md:p-10"
          >
            <div className="absolute -top-px -left-px h-10 w-10 border-t-2 border-l-2 border-gold" />
            <div className="absolute -right-px -bottom-px h-10 w-10 border-r-2 border-b-2 border-gold" />

            <div className="flex items-center gap-2 text-gold">
              <Star size={14} className="fill-gold" />
              <span className="text-[10px] font-light tracking-[0.35em] uppercase">
                Signatur Restoran
              </span>
            </div>
            <h3 className="mt-4 font-serif text-3xl font-medium text-cream">
              Degustasi Tujuh Babak
            </h3>
            <p className="mt-3 text-sm leading-relaxed font-light text-cream/55">
              Tujuh babak yang menceritakan perjalanan rasa dari laut hingga
              daratan, disiapkan langsung oleh Chef Arman.
            </p>

            <ol className="mt-8 space-y-4">
              {courses.map((c, i) => (
                <li key={c} className="flex items-baseline gap-4">
                  <span className="font-serif text-sm text-gold italic">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-sm font-light tracking-wide text-cream/75">
                    {c}
                  </span>
                  <span className="h-px flex-1 border-b border-dotted border-gold/20" />
                </li>
              ))}
            </ol>

            <div className="mt-8 border-t border-gold/15 pt-6">
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] font-light tracking-[0.25em] text-cream/50 uppercase">
                  Per Tamu
                </span>
                <span className="font-serif text-2xl font-medium text-gold">
                  Rp 2.500.000
                </span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-[11px] font-light tracking-[0.25em] text-cream/50 uppercase">
                  Wine Pairing
                </span>
                <span className="font-serif text-lg text-gold-light italic">
                  + Rp 1.850.000
                </span>
              </div>
            </div>

            <a
              href="#reservasi"
              className="group mt-8 flex items-center justify-center gap-3 bg-gold px-8 py-4 text-xs font-medium tracking-[0.28em] text-ink uppercase transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,164,92,0.3)]"
            >
              Pesan Degustasi
              <ArrowRight size={14} className="transition-transform duration-400 group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* A la carte */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-serif text-3xl font-medium text-cream">
              Menu <span className="text-gold italic">à la Carte</span>
            </h3>

            <div className="mt-8 flex flex-wrap gap-3">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`border px-6 py-2.5 text-[11px] font-light tracking-[0.25em] uppercase transition-all duration-400 ${
                    tab === t
                      ? "border-gold bg-gold text-ink"
                      : "border-cream/20 text-cream/60 hover:border-gold/60 hover:text-gold"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.ul
                key={tab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="mt-10 space-y-8"
              >
                {menu[tab].map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    className="group"
                  >
                    <div className="flex items-baseline gap-4">
                      <h4 className="shrink-0 font-serif text-xl font-medium text-cream transition-colors duration-300 group-hover:text-gold-light md:text-2xl">
                        {item.name}
                      </h4>
                      <span className="flex-1 -translate-y-1 border-b border-dotted border-gold/25" />
                      <span className="shrink-0 font-serif text-lg text-gold italic">
                        {item.price}
                      </span>
                    </div>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed font-light text-cream/45">
                      {item.desc}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>

            <p className="mt-10 border-t border-gold/10 pt-6 text-xs font-light tracking-wide text-cream/35">
              * Harga dalam ribuan Rupiah dan sudah termasuk pajak. Menu dapat
              berubah sesuai ketersediaan bahan musiman.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
