import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { Award, ChefHat, Leaf, Wine } from "lucide-react";
import { assetPath } from "../utils/assetPath";

const features = [
  {
    icon: Wine,
    title: "Koleksi Wine Eksklusif",
    desc: "Lebih dari 500 label pilihan dari kebun anggur terbaik di dunia.",
  },
  {
    icon: Award,
    title: "Penghargaan Michelin",
    desc: "Tiga bintang Michelin yang kami pertahankan sejak 2015.",
  },
  {
    icon: ChefHat,
    title: "Maestro Dapur",
    desc: "Tim kuliner di bawah komando Chef Arman Prasetyo.",
  },
  {
    icon: Leaf,
    title: "Bahan Lokal Premium",
    desc: "Bermitra langsung dengan petani dan nelayan terbaik Nusantara.",
  },
];

const stats = [
  { value: 15, suffix: "+", label: "Tahun Pengalaman" },
  { value: 3, suffix: "", label: "Bintang Michelin" },
  { value: 48, suffix: "", label: "Kursi Eksklusif" },
  { value: 500, suffix: "+", label: "Label Wine" },
];

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-serif text-4xl font-medium text-gold md:text-5xl">
        {display}
        <span className="text-gold-light">{suffix}</span>
      </p>
      <p className="mt-2 text-[10px] font-light tracking-[0.28em] text-cream/50 uppercase">
        {label}
      </p>
    </div>
  );
}

export default function About() {
  return (
    <section id="tentang" className="relative overflow-hidden py-24 md:py-36">
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gold/[0.04] blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -top-5 -left-5 h-full w-full border border-gold/30" />
            <div className="relative overflow-hidden">
              <motion.img
                src={assetPath("about.jpg")}
                alt="Sajian elegan Lumière"
                className="aspect-[4/5] w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -bottom-8 -right-4 border border-gold/25 bg-ink/95 px-8 py-6 backdrop-blur md:-right-10"
            >
              <p className="font-serif text-4xl font-medium text-gold">2009</p>
              <p className="mt-1 text-[10px] font-light tracking-[0.3em] text-cream/60 uppercase">
                Berdiri Hingga Kini
              </p>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />
              <span className="text-[10px] font-light tracking-[0.45em] text-gold uppercase">
                Filosofi Kami
              </span>
            </div>
            <h2 className="mt-6 font-serif text-4xl leading-tight font-medium text-cream md:text-5xl lg:text-[3.4rem]">
              Warisan Rasa,{" "}
              <span className="text-gold italic">Dihidupkan</span> dalam Setiap
              Sajian
            </h2>
            <p className="mt-7 max-w-xl font-light leading-relaxed text-cream/60">
              Sejak 2009, Lumière berdiri sebagai pusangga kuliner Jakarta —
              tempat tradisi Perancis bertemu dengan kekayaan bahan Nusantara.
              Setiap hidangan lahir dari ketelitian tinggi, dimulai dari
              pemilihan bahan pada fajar hari hingga sentuhan terakhir emas di
              atas piring.
            </p>
            <p className="mt-4 max-w-xl font-light leading-relaxed text-cream/60">
              Kami percaya bahwa bersantap bukan sekadar memakan, melainkan
              sebuah perayaan kehidupan yang dilayani dengan hangat, disajikan
              dengan seni, dan dikenang selamanya.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.7 }}
                  className="group"
                >
                  <div className="flex h-11 w-11 items-center justify-center border border-gold/30 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ink">
                    <f.icon size={17} strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-medium text-cream">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed font-light text-cream/50">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9 }}
          className="mt-24 grid grid-cols-2 gap-y-12 border-y border-gold/10 py-12 md:grid-cols-4"
        >
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
