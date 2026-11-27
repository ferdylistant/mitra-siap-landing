import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CalendarCheck2, CalendarClock, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import StoreButtons from "./StoreButtons";
import PhoneFrame from "./PhoneFrame";
import { ease } from "./motion";
import { clients, waLink } from "@/lib/site";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Kemiringan 3D mengikuti mouse.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 10]), { stiffness: 90, damping: 18 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, -6]), { stiffness: 90, damping: 18 });

  // Paralaks saat scroll.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={ref}
      id="beranda"
      aria-labelledby="judul-hero"
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="hero-bg relative isolate overflow-hidden pb-24 pt-[112px] text-white sm:pb-32 lg:pb-40 lg:pt-[140px]"
    >
      <motion.div
        aria-hidden
        className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-brand-bright/40 blur-[120px]"
        animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="frame grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        {/* Teks */}
        <motion.div style={{ y: reduce ? 0 : yText }} className="relative z-10">
          <h1 id="judul-hero" className="h-display text-white">
            <motion.span className="block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.1 }}>
              Absensi karyawan,
            </motion.span>
            <motion.span
              className="text-gradient block animate-shine pb-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.22 }}
            >
              langsung dari HP
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.35 }}
            className="mt-6 max-w-[34rem] text-[17px] leading-[1.7] text-[#d5e4ff] sm:text-[18px]"
          >
            SIAP mencatat clock-in dan clock-out, mengurus cuti, izin, dan lembur, lalu menyusun rekap kehadiran tiap bulan secara otomatis. Tanpa mesin fingerprint.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.48 }}
            className="mt-9 flex flex-col items-start gap-4"
          >
            <a href={waLink("Halo, saya ingin menjadwalkan demo aplikasi absensi SIAP.")} target="_blank" rel="nofollow noopener noreferrer" className="btn-white group w-full sm:w-auto">
              <CalendarClock size={18} />
              Jadwalkan demo gratis
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <StoreButtons className="w-full sm:w-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {clients.slice(0, 5).map((c) => (
                <span key={c.src} className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white ring-[3px] ring-[#0a2f80]">
                  <Image src={c.src} alt="" width={44} height={44} className="h-8 w-8 object-contain" />
                </span>
              ))}
            </div>
            <p className="text-[14px] leading-snug text-[#c8dbff]">
              <strong className="block text-[17px] font-bold text-white">150+ perusahaan</strong>
              sudah memakai SIAP setiap hari
            </p>
          </motion.div>
        </motion.div>

        {/* Panggung 3D */}
        <div className="relative mx-auto h-[500px] w-full max-w-[560px] [perspective:1400px] sm:h-[600px] lg:h-[640px]">
          <motion.div style={{ rotateX: rotX, rotateY: rotY }} className="preserve-3d absolute inset-0">
            {/* HP belakang */}
            <motion.div
              style={{ y: reduce ? 0 : yBack, z: -120 }}
              initial={{ opacity: 0, x: 80, rotateY: -30 }}
              animate={{ opacity: 1, x: 0, rotateY: -22 }}
              transition={{ duration: 1.2, ease, delay: 0.35 }}
              className="absolute right-0 top-6 sm:right-2"
            >
              <div className="animate-float-slow [animation-delay:-3s]">
                <PhoneFrame src="/images/screens/daftar-presensi.webp" alt="Layar Daftar Presensi SIAP" className="w-[200px] opacity-95 sm:w-[250px]" sizes="250px" priority />
              </div>
            </motion.div>

            {/* HP depan */}
            <motion.div
              style={{ y: reduce ? 0 : yFront, z: 60 }}
              initial={{ opacity: 0, y: 80, rotateY: -10 }}
              animate={{ opacity: 1, y: 0, rotateY: -16 }}
              transition={{ duration: 1.2, ease, delay: 0.15 }}
              className="absolute left-2 top-16 sm:left-8"
            >
              <div className="animate-float">
                <PhoneFrame src="/images/screens/beranda.webp" alt="Beranda aplikasi SIAP dengan menu presensi dan tombol clock-out" className="w-[230px] sm:w-[290px]" sizes="290px" priority />
              </div>
            </motion.div>

            {/* Kartu mengambang */}
            <FloatCard z={140} className="left-0 top-[60%] sm:-left-12" delay={0.9} floatDelay="-1s">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6F6F0] text-ok">
                <CheckCircle2 size={22} />
              </span>
              <span>
                <span className="block text-[12px] text-soft">Clock in · 07:55</span>
                <span className="block text-[15px] font-bold text-ink">Tepat waktu</span>
              </span>
            </FloatCard>

            <FloatCard z={160} className="right-0 top-[6%] sm:-right-4" delay={1.05} floatDelay="-4s">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-sky text-brand">
                <CalendarCheck2 size={22} />
              </span>
              <span>
                <span className="block text-[12px] text-soft">Pengajuan cuti</span>
                <span className="block text-[15px] font-bold text-ink">Disetujui</span>
              </span>
            </FloatCard>

            <FloatCard z={120} className="bottom-[6%] right-[4%] hidden sm:block" delay={1.2} floatDelay="-2s">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0E8] text-[#E8590C]">
                <MapPin size={22} />
              </span>
              <span>
                <span className="block text-[12px] text-soft">Lokasi absensi</span>
                <span className="block text-[15px] font-bold text-ink">Kantor Yogyakarta</span>
              </span>
            </FloatCard>

            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease, delay: 1.35 }}
              className="absolute left-[46%] top-[2%] hidden h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md sm:flex"
              style={{ z: 200 }}
            >
              <ShieldCheck size={26} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Gelombang */}
      <svg className="waves absolute inset-x-0 bottom-0 h-[70px] w-full sm:h-[110px]" viewBox="0 24 150 28" preserveAspectRatio="none" aria-hidden>
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z" />
        </defs>
        <g>
          <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.18)" />
          <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.32)" />
          <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.55)" />
          <use href="#gentle-wave" x="48" y="7" fill="#ffffff" />
        </g>
      </svg>
    </section>
  );
}

function FloatCard({ className, children, delay, floatDelay, z }: { className: string; children: React.ReactNode; delay: number; floatDelay: string; z: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease, delay }}
      style={{ z }}
      className={`absolute ${className}`}
    >
      <div className="flex animate-float items-center gap-3 rounded-2xl bg-white py-3 pl-3 pr-5 shadow-[0_24px_48px_-16px_rgba(0,0,0,.45)]" style={{ animationDelay: floatDelay }}>
        {children}
      </div>
    </motion.div>
  );
}
