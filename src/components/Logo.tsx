import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors", light ? "bg-white" : "bg-brand-sky")}>
        <Image src="/images/brand/siap-mark.png" alt="" width={40} height={40} className="h-7 w-auto" priority />
      </span>
      <span className={cn("text-[24px] font-extrabold leading-none tracking-[-0.04em] transition-colors", light ? "text-white" : "text-brand")}>SIAP</span>
    </span>
  );
}
