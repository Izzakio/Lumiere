import { motion } from "framer-motion";

const letters = "LUMIÈRE".split("");

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-5 text-[10px] font-light tracking-[0.55em] text-gold"
      >
        FINE DINING — JAKARTA
      </motion.p>
      <div className="flex overflow-hidden">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 + i * 0.07, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl font-medium tracking-[0.18em] text-cream md:text-7xl"
          >
            {l}
          </motion.span>
        ))}
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 1.3, ease: "easeInOut" }}
        className="mt-7 h-px w-44 origin-left bg-gold/70 md:w-56"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="mt-5 text-[10px] font-light tracking-[0.4em] text-cream/40"
      >
        SEJAK 2009
      </motion.p>
    </motion.div>
  );
}
