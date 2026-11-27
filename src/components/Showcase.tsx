import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PhoneFrame from "./PhoneFrame";
import { Reveal, ease } from "./motion";
import { cn } from "@/lib/utils";

const screens = [
  { key: "beranda", label: "Beranda", text: "Clock-in, clock-out, jadwal shift, dan semua menu pengajuan di satu layar." },
  { key: "daftar-presensi", label: "Daftar presensi", text: "Riwayat jam masuk dan pulang per hari, lengkap dengan rekap bulan berjalan." },
  { key: "cuti", label: "Pengajuan cuti", text: "Sisa cuti tahunan dan status setiap pengajuan, dari diajukan sampai disetujui." },
  { key: "lembur", label: "Riwayat lembur", text: "Setiap pengajuan lembur dengan tanggal, jadwal, dan keputusan atasannya." },
  { key: "karyawan", label: "Data karyawan", text: "Daftar karyawan semua cabang dengan nomor induk dan lokasi kerjanya." },
  { key: "menu", label: "Menu utama", text: "Karyawan, persetujuan, pengaturan, dan seluruh riwayat dalam satu menu." },
] as const;

const N = screens.length;
const wrap = (n: number) => ((n % N) + N) % N;

export default function Showcase() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [wide, setWide] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => setWide(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const go = useCallback((d: number) => setActive((a) => wrap(a + d)), []);

  useEffect(() => {
    if (paused || reduce) return;
    // Timer dimulai ulang setiap kali layar berganti, jadi pilihan pengguna tidak langsung tergeser.
    const id = window.setTimeout(() => go(1), 4200);
    return () => window.clearTimeout(id);
  }, [paused, reduce, go, active]);

  const gap = wide ? 210 : 120;
  const s = screens[active];

  return (
    <section id="tampilan" aria-labelledby="judul-tampilan" className="relative overflow-hidden bg-night py-24 text-white lg:py-32">
      <div aria-hidden className="absolute left-1/2 top-[55%] h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/50 blur-[140px]" />

      <div className="frame relative">
        <Reveal className="mx-auto max-w-[42rem] text-center">
          <p className="kicker bg-white/10 text-brand-ice">Tampilan aplikasi</p>
          <h2 id="judul-tampilan" className="h-section mt-5 text-white">
            Sederhana dipakai, <span className="text-gradient animate-shine">rapi dilihat</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[34rem] text-[17px] leading-[1.7] text-[#c8dbff]">Ini layar asli SIAP yang dipakai karyawan setiap hari. Geser atau pilih layarnya.</p>
        </Reveal>

        <div
          className="relative mx-auto mt-14 h-[500px] [perspective:1600px] sm:h-[560px]"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Layar aplikasi SIAP"
        >
          <motion.div
            className="preserve-3d absolute inset-0 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) go(1);
              else if (info.offset.x > 50) go(-1);
            }}
          >
            {screens.map((it, i) => {
              let off = i - active;
              if (off > N / 2) off -= N;
              if (off < -N / 2) off += N;
              const abs = Math.abs(off);
              const hidden = abs > 2;
              return (
                <motion.button
                  key={it.key}
                  type="button"
                  aria-label={`Tampilkan layar ${it.label}`}
                  aria-current={off === 0}
                  tabIndex={off === 0 ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="absolute left-1/2 top-0 -ml-[110px] sm:-ml-[135px]"
                  initial={false}
                  animate={{
                    x: off * gap,
                    z: -abs * 160,
                    rotateY: off * -32,
                    scale: off === 0 ? 1 : 0.86,
                    opacity: hidden ? 0 : abs === 2 ? 0.35 : abs === 1 ? 0.75 : 1,
                  }}
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 20, mass: 0.9 }}
                  style={{ zIndex: 10 - abs, pointerEvents: hidden ? "none" : "auto" }}
                >
                  <PhoneFrame src={`/images/screens/${it.key}.webp`} alt={`Layar ${it.label} di aplikasi SIAP`} className="w-[220px] sm:w-[270px]" sizes="270px" />
                </motion.button>
              );
            })}
          </motion.div>

          <button type="button" onClick={() => go(-1)} aria-label="Layar sebelumnya" className="absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 sm:flex">
            <ChevronLeft />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Layar berikutnya" className="absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 sm:flex">
            <ChevronRight />
          </button>
        </div>

        <div className="mx-auto mt-6 max-w-[40rem] text-center">
          <AnimatePresence mode="wait">
            <motion.div key={s.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease }}>
              <h3 className="text-[22px] text-white">{s.label}</h3>
              <p className="mt-2 text-[16px] text-[#c8dbff]" aria-live="polite">
                {s.text}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {screens.map((it, i) => (
              <button
                key={it.key}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[14px] font-semibold transition-colors",
                  i === active ? "text-ink" : "text-white/70 hover:text-white"
                )}
              >
                {i === active && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 300, damping: 28 }} />}
                <span className="relative">{it.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
