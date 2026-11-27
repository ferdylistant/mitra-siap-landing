import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { clients } from "@/lib/site";

const stats = [
  { value: 150, suffix: "+", label: "perusahaan memakai SIAP" },
  { value: 8, suffix: "", label: "menu pengajuan dalam satu aplikasi" },
  { value: 100, suffix: "%", label: "data tersimpan di server Indonesia" },
  { value: 24, suffix: "/7", label: "dukungan untuk tim HR" },
];

function Count({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export default function Clients() {
  const row = [...clients, ...clients, ...clients];
  return (
    <section aria-labelledby="judul-klien" className="relative py-16 lg:py-20">
      <Reveal className="frame text-center">
        <h2 id="judul-klien" className="text-[15px] font-semibold text-soft">
          Dipercaya oleh perusahaan, rumah sakit, toko, dan penerbit di Indonesia
        </h2>
      </Reveal>

      <div className="mask-fade-x group relative mt-8 overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-6 group-hover:[animation-play-state:paused]">
          {[...row, ...row].map((c, i) => (
            <li key={i} aria-hidden={i >= clients.length || undefined} className="flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl bg-white px-6 ring-1 ring-[#0B1B3A]/[0.06] transition-transform hover:-translate-y-1">
              <Image src={c.src} alt={i < clients.length ? c.name : ""} title={c.name} width={160} height={160} loading="lazy" sizes="140px" className="h-14 w-auto max-w-[130px] object-contain" />
            </li>
          ))}
        </ul>
      </div>

      <Stagger className="frame mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {stats.map((s) => (
          <StaggerItem key={s.label} className="rounded-3xl bg-brand-sky px-6 py-7 text-center">
            <p className="text-[40px] font-extrabold leading-none tracking-[-0.04em] text-brand lg:text-[48px]">
              <Count to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-3 text-[14px] leading-snug text-soft lg:text-[15px]">{s.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
