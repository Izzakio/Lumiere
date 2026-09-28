import { motion } from "framer-motion";
import { assetPath } from "../utils/assetPath";

const items = [
  { src: assetPath("gallery-2.jpg"), caption: "Seni Penyajian", span: "col-span-2 row-span-2" },
  { src: assetPath("gallery-1.jpg"), caption: "Wine Pairing", span: "" },
  { src: assetPath("gallery-3.jpg"), caption: "Oyster Royale", span: "" },
  { src: assetPath("private.jpg"), caption: "Ruang Privat", span: "col-span-2" },
  { src: assetPath("dish-2.jpg"), caption: "Hokkaido Scallop", span: "" },
  { src: assetPath("about.jpg"), caption: "Atmosphere Malam", span: "" },
];

export default function Gallery() {
  return (
    <section id="galeri" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gold" />
            <span className="text-[10px] font-light tracking-[0.45em] text-gold uppercase">
              Galeri
            </span>
            <span className="h-px w-12 bg-gold" />
          </div>
          <h2 className="mt-6 font-serif text-4xl leading-tight font-medium text-cream md:text-5xl lg:text-6xl">
            Momen <span className="text-gold italic">Tak Terlupakan</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed font-light text-cream/50">
            Jendela ke dunia Lumière — di mana estetika, rasa, dan kehangatan
            bertemu dalam satu panggung.
          </p>
        </div>

        <div className="mt-16 grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[230px] md:grid-cols-4">
          {items.map((item, i) => (
            <motion.figure
              key={item.src + item.caption}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.caption}
                className="h-full w-full object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute right-0 bottom-0 left-0 flex translate-y-4 items-center justify-between p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="font-serif text-lg font-light text-cream italic">
                  {item.caption}
                </span>
                <span className="font-serif text-sm text-gold italic">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </figcaption>
              <span className="absolute inset-3 border border-gold/0 transition-all duration-500 group-hover:border-gold/40" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
