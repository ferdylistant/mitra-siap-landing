import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./motion";

const items = [
  { name: "Bunga", role: "HR Manager", text: "SIAP sangat membantu tim HR memantau kehadiran karyawan secara real-time.", tone: "bg-brand" },
  { name: "Ferdy", role: "Operations Lead", text: "Pengajuan izin dan cuti jadi lebih cepat dan rapi dengan SIAP.", tone: "bg-[#12B886]" },
  { name: "Pipo", role: "Business Owner", text: "Sebagai owner, saya bisa memonitor jam kerja tim dengan mudah.", tone: "bg-[#E8590C]" },
];

export default function Testimonials() {
  return (
    <section aria-labelledby="judul-testimoni" className="pb-24 pt-12 lg:pb-32 lg:pt-16">
      <div className="frame">
        <Reveal className="mx-auto max-w-[40rem] text-center">
          <p className="kicker">Testimoni</p>
          <h2 id="judul-testimoni" className="h-section mt-5">
            Kata mereka yang <span className="text-gradient-brand">sudah memakai SIAP</span>
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((t, i) => (
            <StaggerItem key={t.name}>
              <div className={`h-full ${i === 1 ? "lg:-translate-y-6" : ""}`}>
              <motion.figure
                whileHover={{ y: -8, rotate: i === 1 ? 0 : i === 0 ? -1 : 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="card relative flex h-full flex-col p-8 hover:shadow-lift"
              >
                <Quote aria-hidden className="absolute right-7 top-7 text-brand-mist" size={44} />
                <div role="img" className="flex gap-1 text-[#FAB005]" aria-label="5 dari 5 bintang">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={18} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-[19px] font-medium leading-[1.55] text-ink">{t.text}</blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span aria-hidden className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-[14px] font-bold text-white ${t.tone}`}>
                    {t.name.slice(0, 2).toUpperCase()}
                  </span>
                  <span>
                    <span className="block text-[16px] font-bold text-ink">{t.name}</span>
                    <span className="block text-[14px] text-soft">{t.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
