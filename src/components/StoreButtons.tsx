import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 384 512" fill="currentColor" className={className}>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 512 512" className={className}>
      <path fill="#00D7FE" d="M48 59.5v393c0 8.6 4.9 16 12 19.6L288 256 60 39.9c-7.1 3.6-12 11-12 19.6z" />
      <path fill="#FFCE00" d="M371.9 172.3 288 256l83.9 83.7 95.6-54.2c10.1-5.7 16.5-16.5 16.5-28.1v-3c0-11.6-6.4-22.4-16.5-28.1l-95.6-54z" />
      <path fill="#FF3A44" d="M60 472.1c6.9 3.5 15.4 3.6 22.8-.6l289.1-131.8L288 256 60 472.1z" />
      <path fill="#00F076" d="M82.8 40.5C75.4 36.3 66.9 36.4 60 39.9L288 256l83.9-83.7L82.8 40.5z" />
    </svg>
  );
}

type Props = { className?: string; tone?: "dark" | "ghost"; compact?: boolean };

/** Tombol unduh App Store dan Google Play. Masing-masing hanya tampil bila NEXT_PUBLIC_APP_STORE_URL / NEXT_PUBLIC_PLAY_STORE_URL diisi. */
export default function StoreButtons({ className, tone = "ghost", compact }: Props) {
  const stores = [
    site.appStoreUrl && { href: site.appStoreUrl, top: "Unduh di", name: "App Store", icon: <AppleIcon className={compact ? "h-6 w-6" : "h-7 w-7"} />, label: "Unduh SIAP di App Store" },
    site.playStoreUrl && { href: site.playStoreUrl, top: "Dapatkan di", name: "Google Play", icon: <PlayIcon className={compact ? "h-6 w-6" : "h-7 w-7"} />, label: "Unduh SIAP di Google Play" },
  ].filter(Boolean) as { href: string; top: string; name: string; icon: React.ReactNode; label: string }[];

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {stores.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener"
          aria-label={s.label}
          className={cn(
            compact ? "group inline-flex h-[50px] items-center gap-2.5 rounded-xl px-3.5 text-left" : "group inline-flex h-[56px] min-w-[172px] flex-1 items-center gap-3 rounded-2xl px-4 text-left sm:flex-none",
            "transition-[transform,background-color] duration-200 hover:-translate-y-0.5 active:scale-[0.97]",
            tone === "ghost" ? "bg-white/10 text-white ring-1 ring-inset ring-white/25 hover:bg-white/20" : "bg-black text-white hover:bg-[#1a1a1a]"
          )}
        >
          <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">{s.icon}</span>
          <span className="leading-tight">
            <span className={cn("block font-medium opacity-80", compact ? "text-[10px]" : "text-[11px]")}>{s.top}</span>
            <span className={cn("block font-bold tracking-[-0.01em]", compact ? "text-[15px]" : "text-[18px]")}>{s.name}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
