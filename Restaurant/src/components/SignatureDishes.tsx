import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { assetPath } from "../utils/assetPath";

const dishes = [
  {
    image: assetPath("dish-1.jpg"),
    num: "01",
    name: "Wagyu A5 Rossini",
    desc: "Wagyu A5 di atas foie gras panggang, truffle Périgord, saus Madeira tua.",
    price: "1.250.000",
  },
  {
    image: assetPath("dish-2.jpg"),
    num: "02",
    name: "Hokkaido Scallop",
    desc: "Scallop dibakar sempurna, krem safron, kaviar Ossetra, bunga laut.",
    price: "685.000",
  },
  {
    image: assetPath("dish-3.jpg"),
    num: "03",
    name: "Simfoni Cokelat 70%",
    desc: "Sphere cokelat single origin, raspberry segar, daun emas 24 karat.",
    price: "385.000",
  },
];

export default function SignatureDishes() {
  return (
    <section id="signature" className="relative bg-coal py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />
              <span className="text-[10px] font-light tracking-[0.45em] text-gold uppercase">
                Ciptaan Signature
              </span>
            </div>
            <h2 className="mt-6 max-w-xl font-serif text-4xl leading-tight font-medium text-cream md:text-5xl">
              Tiga Simfoni yang{" "}
              <span className="text-gold italic">Mendefinisikan</span> Kami
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed font-light text-cream/50">
            Setiap piring signature adalah kisah lima belas tahun perjalanan
            kuliner — dari dapur Paris hingga pasar ikan Muara Angke.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {dishes.map((d, i) => (
            <motion.article
              key={d.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="relative overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-95" />

                <span className="absolute top-5 left-5 font-serif text-5xl font-light text-cream/25 italic transition-colors duration-500 group-hover:text-gold/60">
                  {d.num}
                </span>

                <span className="absolute top-5 right-5 border border-gold/40 bg-ink/70 px-4 py-1.5 text-[11px] font-light tracking-[0.15em] text-gold backdrop-blur-sm">
                  Rp {d.price}
                </span>

                <div className="absolute right-0 bottom-0 left-0 p-7">
                  <span className="mb-3 block h-px w-10 bg-gold transition-all duration-700 group-hover:w-20" />
                  <h3 className="font-serif text-2xl font-medium text-cream">
                    {d.name}
                  </h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed font-light text-cream/60 opacity-0 transition-all duration-700 group-hover:max-h-24 group-hover:opacity-100">
                    {d.desc}
                  </p>
                </div>
              </div>

              <a
                href="#reservasi"
                className="mt-4 inline-flex items-center gap-2 text-[10px] font-light tracking-[0.3em] text-cream/40 uppercase transition-colors duration-300 group-hover:text-gold"
              >
                Cicipi Malam Ini
                <ArrowUpRight size={13} className="transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
