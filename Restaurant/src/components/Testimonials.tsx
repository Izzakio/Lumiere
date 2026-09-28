import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Pengalaman bersantap yang mengubah persepsi saya tentang fine dining. Setiap babak degustasi adalah kisah yang diceritakan dengan sempurna — visual, aroma, dan rasa berpadu tanpa cela.",
    name: "Andini Wijaya",
    role: "Kritikus Kuliner · Jakarta Post",
  },
  {
    quote:
      "Servis yang tanpa cela, ambience yang memukau, dan wagyu terbaik yang pernah saya coba di Asia Tenggara. Lumière menetapkan standar baru bagi restoran fine dining di kota ini.",
    name: "Michael Tanaka",
    role: "Food Vlogger · 2.4M Followers",
  },
  {
    quote:
      "Lumière bukan sekadar restoran — ia adalah teater rasa. Kami kembali setiap tahun untuk merayakan ulang tahun pernikahan, dan setiap kunjungan selalu lebih magis dari sebelumnya.",
    name: "Sarah & James Lincoln",
    role: "Tamu Setia Sejak 2012",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(t);
  }, []);

  const go = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  return (
    <section
      id="testimoni"
      className="relative overflow-hidden border-y border-gold/10 bg-coal py-24 md:py-32"
    >
      <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gold/[0.05] blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center border border-gold/40">
          <Quote size={20} className="text-gold" strokeWidth={1.5} />
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} className="fill-gold text-gold" />
          ))}
        </div>

        <div className="relative mt-8 min-h-[190px] md:min-h-[160px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mx-auto max-w-3xl font-serif text-xl leading-relaxed font-light text-cream/85 italic md:text-2xl">
                "{current.quote}"
              </p>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`author-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <p className="font-serif text-lg font-medium text-gold">{current.name}</p>
            <p className="mt-1 text-[10px] font-light tracking-[0.3em] text-cream/45 uppercase">
              {current.role}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => go(-1)}
            aria-label="Testimoni sebelumnya"
            className="flex h-11 w-11 items-center justify-center border border-cream/20 text-cream/60 transition-all duration-300 hover:border-gold hover:text-gold"
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Testimoni ${i + 1}`}
                className={`h-px transition-all duration-500 ${
                  i === index ? "w-10 bg-gold" : "w-5 bg-cream/25 hover:bg-cream/50"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Testimoni berikutnya"
            className="flex h-11 w-11 items-center justify-center border border-cream/20 text-cream/60 transition-all duration-300 hover:border-gold hover:text-gold"
          >
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
