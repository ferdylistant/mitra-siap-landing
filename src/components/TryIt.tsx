import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, MousePointerClick, Timer } from "lucide-react";
import PhoneFrame from "./PhoneFrame";
import ClockCard from "./ClockCard";
import { Reveal, Stagger, StaggerItem } from "./motion";

const steps = [
  { icon: MousePointerClick, title: "Tekan Clock In", text: "Jam masuk tercatat saat itu juga, sesuai waktu WIB." },
  { icon: Timer, title: "Status langsung keluar", text: "Dibandingkan dengan shift 08:00–16:45: tepat waktu, atau terlambat sekian menit." },
  { icon: CheckCircle2, title: "Clock Out saat pulang", text: "Pulang lebih awal ikut terhitung dan masuk ke rekap bulanan." },
];

export default function TryIt() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-18, -6, 6]);
  const tiltX = useTransform(scrollYProgress, [0, 0.5, 1], [14, 4, -4]);

  return (
    <section ref={ref} id="coba" aria-labelledby="judul-coba" className="relative overflow-hidden bg-brand-sky py-24 lg:py-32">
      <div className="frame relative grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="kicker bg-white">Coba sendiri</p>
            <h2 id="judul-coba" className="h-section mt-5 max-w-[16ch]">
              Rasakan clock-in SIAP, <span className="text-gradient-brand">sekarang juga</span>
            </h2>
            <p className="lead mt-5 max-w-[32rem]">Layar di samping adalah tiruan menu presensi aplikasi SIAP. Tekan tombolnya dan lihat bagaimana statusnya dihitung.</p>
          </Reveal>
          <Stagger className="mt-10 flex flex-col gap-4">
            {steps.map((s) => (
              <StaggerItem key={s.title} className="flex gap-4 rounded-3xl bg-white p-5 shadow-card">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-white">
                  <s.icon size={22} />
                </span>
                <span>
                  <span className="block text-[17px] font-bold text-ink">{s.title}</span>
                  <span className="mt-1 block text-[15px] leading-[1.6] text-soft">{s.text}</span>
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="relative flex justify-center [perspective:1400px]">
          <div aria-hidden className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-bright/30 blur-[90px]" />
          <motion.div style={reduce ? undefined : { rotateY: rotate, rotateX: tiltX }} className="preserve-3d relative">
            <div className="animate-float">
              <PhoneFrame className="w-[300px] sm:w-[330px]" bar="#0D47A1">
                <ClockCard />
              </PhoneFrame>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
