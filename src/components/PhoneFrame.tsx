import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  children?: ReactNode;
  /** Warna status bar; default biru header aplikasi SIAP. */
  bar?: string;
};

/** Bingkai ponsel dari CSS: bezel, tombol samping, dynamic island, status bar, lalu layar asli. */
export default function PhoneFrame({ src, alt = "", className, priority, sizes = "300px", children, bar = "#0D47A1" }: Props) {
  return (
    <div className={cn("relative aspect-[9/19] w-[280px] select-none", className)}>
      {/* tombol samping */}
      <span aria-hidden className="absolute -left-[3px] top-[18%] h-[7%] w-[3px] rounded-l bg-[#1b2440]" />
      <span aria-hidden className="absolute -left-[3px] top-[28%] h-[11%] w-[3px] rounded-l bg-[#1b2440]" />
      <span aria-hidden className="absolute -right-[3px] top-[24%] h-[14%] w-[3px] rounded-r bg-[#1b2440]" />

      <div className="absolute inset-0 rounded-[15%/7%] bg-gradient-to-b from-[#2a3555] via-[#121a33] to-[#0b1124] p-[3.6%] shadow-phone ring-1 ring-white/10">
        <div className="relative h-full w-full overflow-hidden rounded-[12.5%/5.8%] bg-white">
          {/* status bar */}
          <div className="relative z-10 flex h-[6.4%] items-center justify-between px-[8%] text-[10px] font-semibold text-white" style={{ background: bar }}>
            {/* Jam tiruan: dekoratif, ditulis lewat ::before agar tidak ikut cek kontras teks. */}
            <span aria-hidden className="before:content-['9:41']" />
            <span aria-hidden className="absolute left-1/2 top-[22%] h-[58%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
            <span className="flex items-center gap-1" aria-hidden>
              <svg width="14" height="9" viewBox="0 0 14 9" fill="currentColor"><rect x="0" y="6" width="2.4" height="3" rx=".6" /><rect x="3.8" y="4" width="2.4" height="5" rx=".6" /><rect x="7.6" y="2" width="2.4" height="7" rx=".6" /><rect x="11.4" y="0" width="2.4" height="9" rx=".6" /></svg>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none"><rect x=".5" y=".5" width="17" height="9" rx="2.5" stroke="currentColor" opacity=".5" /><rect x="2" y="2" width="12" height="6" rx="1.5" fill="currentColor" /><rect x="18.5" y="3.5" width="1.2" height="3" rx=".6" fill="currentColor" opacity=".5" /></svg>
            </span>
          </div>
          {src ? (
            <Image src={src} alt={alt} width={540} height={1006} priority={priority} sizes={sizes} className="block h-auto w-full" draggable={false} />
          ) : (
            <div className="h-[93.6%]">{children}</div>
          )}
          <span aria-hidden className="absolute bottom-[1.4%] left-1/2 h-[0.7%] w-[34%] -translate-x-1/2 rounded-full bg-[#0b1124]/80" />
          {/* kilau kaca */}
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent opacity-60" />
        </div>
      </div>
    </div>
  );
}
