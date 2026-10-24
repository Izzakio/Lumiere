import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  MapPin,
  Phone,
  Shirt,
} from "lucide-react";

const infoItems = [
  {
    icon: MapPin,
    title: "Alamat",
    lines: ["Jl. Senopati No. 88, Kebayoran Baru", "Jakarta Selatan 12190"],
  },
  {
    icon: Clock,
    title: "Jam Operasional",
    lines: ["Selasa – Minggu · 17.00 – 23.00", "Senin & Hari Besar Tutup"],
  },
  {
    icon: Phone,
    title: "Kontak",
    lines: ["+62 21 2751 8888", "reservasi@lumiere.id"],
  },
  {
    icon: Shirt,
    title: "Dress Code",
    lines: ["Smart Elegant", "Dilarang memakai sandal & kaos"],
  },
];

const times = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

const inputCls =
  "w-full border border-cream/15 bg-white/[0.03] px-4 py-3.5 text-sm font-light text-cream placeholder:text-cream/30 outline-none transition-all duration-300 focus:border-gold/70 focus:bg-white/[0.05] [color-scheme:dark]";

export default function Reservation() {
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const message = [
      "Halo Lumière, saya ingin mengajukan reservasi:",
      `Nama: ${formData.get("name")}`,
      `Nomor telepon: ${formData.get("phone")}`,
      `Tanggal: ${formData.get("date")}`,
      `Waktu: ${formData.get("time")} WIB`,
      `Jumlah tamu: ${formData.get("guests")}`,
      `Permintaan khusus: ${formData.get("notes") || "-"}`,
    ].join("\n");
    const url = `https://wa.me/628981056300?${new URLSearchParams({ text: message })}`;

    setWhatsappUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="reservasi" className="relative overflow-hidden py-24 md:py-36">
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gold/[0.05] blur-[130px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />
              <span className="text-[10px] font-light tracking-[0.45em] text-gold uppercase">
                Reservasi
              </span>
            </div>
            <h2 className="mt-6 font-serif text-4xl leading-tight font-medium text-cream md:text-5xl">
              Amankan <span className="text-gold italic">Meja</span> Anda Malam Ini
            </h2>
            <p className="mt-6 max-w-md leading-relaxed font-light text-cream/55">
              Hanya 48 kursi tersedia setiap malam. Reservasi minimal 1×24 jam
              sebelumnya sangat disarankan untuk pengalaman degustasi terbaik.
            </p>

            <div className="mt-10 grid gap-7 sm:grid-cols-2">
              {infoItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.7 }}
                  className="flex gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/30 text-gold">
                    <item.icon size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-medium tracking-[0.28em] text-cream uppercase">
                      {item.title}
                    </h3>
                    {item.lines.map((l) => (
                      <p key={l} className="mt-1 text-sm font-light text-cream/50">
                        {l}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 flex items-center gap-4 border border-gold/15 bg-coal/60 p-6">
              <CalendarDays size={22} className="shrink-0 text-gold" strokeWidth={1.5} />
              <p className="text-sm leading-relaxed font-light text-cream/60">
                Untuk rombongan lebih dari{" "}
                <span className="text-gold">8 tamu</span> atau acara privat,
                hubungi tim kami langsung di{" "}
                <a href="tel:+622127518888" className="text-gold italic underline-offset-4 hover:underline">
                  +62 21 2751 8888
                </a>
                .
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative border border-gold/20 bg-coal/70 p-8 backdrop-blur md:p-10"
          >
            <div className="absolute -top-px -left-px h-10 w-10 border-t-2 border-l-2 border-gold" />
            <div className="absolute -right-px -bottom-px h-10 w-10 border-r-2 border-b-2 border-gold" />

            {whatsappUrl ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex min-h-[480px] flex-col items-center justify-center text-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
                  <Check size={30} className="text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="mt-8 font-serif text-3xl font-medium text-cream">
                  Lanjutkan di WhatsApp
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed font-light text-cream/55">
                  Pesan reservasi sudah disiapkan untuk nomor kami. Silakan tekan{" "}
                  <span className="text-gold">Kirim</span> di WhatsApp agar
                  permintaan Anda diterima.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 bg-gold px-8 py-3.5 text-[11px] font-light tracking-[0.28em] text-ink uppercase transition-all duration-400 hover:shadow-[0_0_45px_rgba(201,164,92,0.35)]"
                >
                  Buka WhatsApp
                </a>
                <button
                  onClick={() => setWhatsappUrl("")}
                  className="mt-5 border border-gold/60 px-8 py-3.5 text-[11px] font-light tracking-[0.28em] text-gold uppercase transition-all duration-400 hover:bg-gold hover:text-ink"
                >
                  Buat Reservasi Lain
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-serif text-2xl font-medium text-cream">
                  Formulir <span className="text-gold italic">Reservasi</span>
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-light tracking-[0.28em] text-cream/50 uppercase">
                      Nama Lengkap
                    </label>
                    <input required name="name" type="text" placeholder="Nama Anda" className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] font-light tracking-[0.28em] text-cream/50 uppercase">
                      Nomor Telepon
                    </label>
                    <input required name="phone" type="tel" placeholder="+62 812 ..." className={inputCls} />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-light tracking-[0.28em] text-cream/50 uppercase">
                      Tanggal
                    </label>
                    <input required name="date" type="date" className={inputCls} />
                  </div>
                  <div className="relative">
                    <label className="mb-2 block text-[10px] font-light tracking-[0.28em] text-cream/50 uppercase">
                      Waktu
                    </label>
                    <select required name="time" defaultValue="" className={`${inputCls} appearance-none pr-10`}>
                      <option value="" disabled>
                        Pilih waktu
                      </option>
                      {times.map((t) => (
                        <option key={t} value={t} className="bg-ink">
                          {t} WIB
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={15} className="pointer-events-none absolute right-4 bottom-4 text-cream/40" />
                  </div>
                </div>

                <div className="relative">
                  <label className="mb-2 block text-[10px] font-light tracking-[0.28em] text-cream/50 uppercase">
                    Jumlah Tamu
                  </label>
                  <select required name="guests" defaultValue="" className={`${inputCls} appearance-none pr-10`}>
                    <option value="" disabled>
                      Pilih jumlah tamu
                    </option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n} className="bg-ink">
                        {n} Tamu
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={15} className="pointer-events-none absolute right-4 bottom-4 text-cream/40" />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-light tracking-[0.28em] text-cream/50 uppercase">
                    Permintaan Khusus <span className="normal-case">(opsional)</span>
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Perayaan ulang tahun, alergi makanan, preferensi tempat duduk..."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 bg-gold px-8 py-4 text-xs font-medium tracking-[0.3em] text-ink uppercase transition-all duration-500 hover:shadow-[0_0_45px_rgba(201,164,92,0.35)]"
                >
                  Konfirmasi Reservasi
                </button>

                <p className="flex items-center justify-center gap-2 text-center text-[10px] font-light tracking-wide text-cream/35">
                  <Phone size={11} className="text-gold/70" />
                  Detail reservasi akan dibuka di WhatsApp untuk dikirim
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
