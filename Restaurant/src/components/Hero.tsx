import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown, Clock, MapPin, Star } from "lucide-react";
import { assetPath } from "../utils/assetPath";

const letters = "LUMIÈRE".split("");

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const letterVar: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ active }: { active: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="beranda"
      ref={ref}
      className="relative flex h-svh min-h-[680px] flex-col overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={assetPath("hero.jpg")}
          alt="Interior restoran Lumière"
          className="h-full w-full animate-kenburns object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/45 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,10,8,0.55)_100%)]" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.9 }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="h-px w-10 bg-gold/70 md:w-16" />
          <span className="text-[10px] font-light tracking-[0.5em] text-gold md:text-xs">
            FINE DINING · SEJAK 2009
          </span>
          <span className="h-px w-10 bg-gold/70 md:w-16" />
        </motion.div>

        <motion.h1
          variants={container}
          initial="hidden"
          animate={active ? "visible" : "hidden"}
          className="flex overflow-hidden font-serif text-[clamp(3.4rem,13vw,11rem)] leading-none font-medium tracking-[0.12em] text-cream"
          aria-label="Lumière"
        >
          {letters.map((l, i) => (
            <motion.span key={i} variants={letterVar} className="inline-block">
              {l}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75, duration: 1 }}
          className="mt-6 max-w-xl font-serif text-xl font-light text-cream/75 italic md:text-2xl"
        >
          "Di mana setiap hidangan adalah mahakarya, dan setiap malam adalah
          sebuah pertunjukan rasa."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.95, duration: 1 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#reservasi"
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-gold px-10 py-4 text-xs font-medium tracking-[0.28em] text-ink uppercase transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,164,92,0.35)]"
          >
            Reservasi Meja
            <ArrowRight size={14} className="transition-transform duration-400 group-hover:translate-x-1" />
          </a>
          <a
            href="#menu"
            className="inline-flex items-center gap-3 border border-cream/30 px-10 py-4 text-xs font-light tracking-[0.28em] text-cream uppercase transition-all duration-500 hover:border-gold hover:text-gold"
          >
            Jelajahi Menu
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-gold/70" />
        </motion.div>
      </motion.div>

      {/* Bottom info bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 1.3, duration: 1 }}
        className="relative z-10 border-t border-cream/10 bg-ink/40 backdrop-blur-md"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-cream/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex items-center justify-center gap-3 py-4 text-[10px] font-light tracking-[0.25em] text-cream/60 uppercase">
            <Clock size={13} className="shrink-0 text-gold" />
            Selasa – Minggu · 17.00 – 23.00
          </div>
          <div className="flex items-center justify-center gap-3 py-4 text-[10px] font-light tracking-[0.25em] text-cream/60 uppercase">
            <MapPin size={13} className="shrink-0 text-gold" />
            Jl. Senopati No. 88 · Jakarta
          </div>
          <div className="flex items-center justify-center gap-3 py-4 text-[10px] font-light tracking-[0.25em] text-cream/60 uppercase">
            <Star size={13} className="shrink-0 fill-gold text-gold" />
            Michelin Guide · Tiga Bintang
          </div>
        </div>
      </motion.div>
    </section>
  );
}
