import { motion } from "framer-motion";
import { Award, Globe2, GraduationCap } from "lucide-react";
import { assetPath } from "../utils/assetPath";

const achievements = [
  { icon: Award, label: "Michelin 3 Bintang" },
  { icon: Globe2, label: "Asia's 50 Best Chef" },
  { icon: GraduationCap, label: "Le Cordon Bleu · Paris" },
];

export default function Chef() {
  return (
    <section id="chef" className="relative overflow-hidden bg-coal py-24 md:py-36">
      <div className="pointer-events-none absolute top-1/2 -left-40 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-gold/[0.05] blur-[130px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />
              <span className="text-[10px] font-light tracking-[0.45em] text-gold uppercase">
                Maestro di Balik Dapur
              </span>
            </div>

            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.9 }}
              className="mt-8"
            >
              <span className="font-serif text-7xl leading-none text-gold/40">"</span>
              <p className="-mt-4 font-serif text-2xl leading-snug font-light text-cream italic md:text-[2rem]">
                Memasak bukan sekadar teknik — ia adalah bahasa cinta yang
                saya ucapkan lewat setiap piring yang keluar dari dapur saya.
              </p>
            </motion.blockquote>

            <div className="mt-8 flex items-center gap-5">
              <span className="h-px w-14 bg-gold/60" />
              <div>
                <p className="font-serif text-xl font-medium text-gold">
                  Chef Arman Prasetyo
                </p>
                <p className="text-[10px] font-light tracking-[0.3em] text-cream/50 uppercase">
                  Executive Chef & Pendiri
                </p>
              </div>
            </div>

            <p className="mt-8 max-w-xl leading-relaxed font-light text-cream/55">
              Berlatih di Le Cordon Bleu Paris dan mengasah keterampilannya di
              dapur bintang Michelin Eropa selama satu dekade, Chef Arman
              kembali ke tanah air dengan satu misi — menghadirkan pengalaman
              bersantap kelas dunia yang berpijak pada kekayaan rasa
              Nusantara.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  className="flex items-center gap-3 border border-gold/25 px-5 py-3"
                >
                  <a.icon size={15} className="text-gold" strokeWidth={1.5} />
                  <span className="text-[11px] font-light tracking-[0.15em] text-cream/70 uppercase">
                    {a.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-2"
          >
            <div className="absolute -top-5 -right-5 h-full w-full border border-gold/30" />
            <div className="relative overflow-hidden">
              <motion.img
                src={assetPath("chef.jpg")}
                alt="Chef Arman Prasetyo"
                className="aspect-[4/5] w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-7">
                <p className="font-serif text-lg font-light text-cream/90 italic">
                  "Setiap bahan punya cerita — tugas saya adalah menuturkannya
                  dengan sempurna."
                </p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -bottom-8 -left-4 border border-gold/25 bg-ink/95 px-8 py-6 backdrop-blur md:-left-10"
            >
              <p className="font-serif text-4xl font-medium text-gold">20+</p>
              <p className="mt-1 text-[10px] font-light tracking-[0.3em] text-cream/60 uppercase">
                Tahun Pengalaman Global
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
