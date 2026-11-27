import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Download, LineChart, Settings2 } from "lucide-react";
import PhoneFrame from "./PhoneFrame";
import { Reveal } from "./motion";

const stages = [
  {
    icon: Download,
    title: "Unduh dan masuk",
    body: "Karyawan memasang SIAP di HP, sementara HR membuka dashboard di web. Semua masuk memakai akun perusahaan.",
    img: "beranda",
    alt: "Beranda SIAP dengan menu pengajuan",
  },
  {
    icon: Settings2,
    title: "Atur aturan kerjanya",
    body: "HR mengisi data karyawan, jam kerja per shift, lokasi absensi, serta aturan cuti dan izin dalam satu dashboard.",
    img: "karyawan",
    alt: "Daftar karyawan SIAP dari berbagai cabang",
  },
  {
    icon: LineChart,
    title: "Pantau dan unduh rekap",
    body: "Kehadiran terlihat real-time, dan rekap bulanan siap diunduh untuk HR dan manajemen.",
    img: "rekap-bulanan",
    alt: "Rekap bulanan SIAP: sisa hari kerja, pulang cepat, terlambat, dan tidak clock-out",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="cara-kerja" aria-labelledby="judul-cara" className="relative overflow-hidden bg-gradient-to-b from-white via-brand-sky to-white py-16 lg:py-20">
      <div className="frame">
        <Reveal className="mx-auto max-w-[40rem] text-center">
          <p className="kicker bg-white">Cara kerja</p>
          <h2 id="judul-cara" className="h-section mt-5">
            Mulai dalam <span className="text-gradient-brand">tiga langkah</span>
          </h2>
          <p className="lead mx-auto mt-5 max-w-[32rem]">Tidak perlu memasang alat apa pun di kantor. Tim kami mendampingi dari hari pertama.</p>
        </Reveal>

        <ol ref={ref} className="relative mx-auto mt-16 max-w-[980px]">
          {/* Garis yang tergambar mengikuti scroll */}
          <span aria-hidden className="absolute bottom-0 left-[27px] top-0 w-[3px] rounded-full bg-brand-mist md:left-1/2 md:-ml-[1.5px]" />
          <motion.span aria-hidden style={{ scaleY: progress }} className="absolute bottom-0 left-[27px] top-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-brand-bright to-brand md:left-1/2 md:-ml-[1.5px]" />

          {stages.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={s.title} className="relative grid gap-8 pb-20 pl-20 last:pb-0 md:grid-cols-2 md:gap-20 md:pl-0">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="absolute left-0 top-0 z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-lift ring-[6px] ring-white md:left-1/2 md:-ml-7"
                >
                  <s.icon size={24} />
                </motion.span>

                <Reveal className={flip ? "md:order-2 md:pl-4" : "md:pr-4 md:text-right"}>
                  <p className="text-[14px] font-bold text-brand-bright">Langkah {i + 1}</p>
                  <h3 className="mt-2 text-[26px]">{s.title}</h3>
                  <p className={`mt-3 max-w-[26rem] text-[16px] leading-[1.7] text-soft ${flip ? "" : "md:ml-auto"}`}>{s.body}</p>
                </Reveal>

                <Reveal delay={0.15} className={`flex ${flip ? "md:order-1 md:justify-end md:pr-4" : "md:pl-4"}`}>
                  <div className="[perspective:1200px]">
                    <motion.div
                      initial={{ rotateY: flip ? 25 : -25, rotateX: 8, opacity: 0 }}
                      whileInView={{ rotateY: flip ? 10 : -10, rotateX: 4, opacity: 1 }}
                      whileHover={{ rotateY: 0, rotateX: 0, y: -8 }}
                      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                      transition={{ type: "spring", stiffness: 70, damping: 16 }}
                    >
                      <div className="h-[340px] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]">
                        <PhoneFrame src={`/images/screens/${s.img}.webp`} alt={s.alt} className="w-[200px]" sizes="200px" />
                      </div>
                    </motion.div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
