import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, CalendarDays, Coffee, FileText, Home, Menu as MenuIcon, MessageSquareText, Moon } from "lucide-react";
import { cn, dateWIB, nowWIB, pad } from "@/lib/utils";

const menu = [
  { label: "Cuti", icon: CalendarDays, tone: "text-[#E8590C]" },
  { label: "Lembur", icon: Moon, tone: "text-[#5F3DC4]" },
  { label: "Istirahat", icon: Coffee, tone: "text-[#B54708]" },
  { label: "Chatbot", icon: MessageSquareText, tone: "text-[#0B7285]" },
];

type Stamp = { h: number; m: number };

const SHIFT_IN = 8 * 60; // 08:00
const SHIFT_OUT = 16 * 60 + 45; // 16:45

const fmt = (t?: Stamp) => (t ? `${pad(t.h)}:${pad(t.m)}` : "-- : --");
const dur = (min: number) => (min >= 60 ? `${Math.floor(min / 60)} jam ${min % 60} menit` : `${min} menit`);

function inStatus(t?: Stamp) {
  if (!t) return { text: "Belum clock-in", tone: "text-[#6B7280]" };
  const late = t.h * 60 + t.m - SHIFT_IN;
  return late <= 0 ? { text: "Tepat waktu", tone: "text-ok" } : { text: `Terlambat ${dur(late)}`, tone: "text-alert" };
}

function outStatus(t?: Stamp) {
  if (!t) return { text: "Belum clock-out", tone: "text-[#6B7280]" };
  const early = SHIFT_OUT - (t.h * 60 + t.m);
  return early > 0 ? { text: `Pulang cepat ${dur(early)}`, tone: "text-alert" } : { text: "Sesuai jadwal", tone: "text-ok" };
}

/** Layar "Menu Presensi" dari aplikasi SIAP yang benar-benar bisa dicoba (jam WIB saat ini). */
export default function ClockCard({ className }: { className?: string }) {
  const [now, setNow] = useState<{ h: number; m: number; s: number } | null>(null);
  const [today, setToday] = useState("");
  const [clockIn, setClockIn] = useState<Stamp>();
  const [clockOut, setClockOut] = useState<Stamp>();

  useEffect(() => {
    const tick = () => setNow(nowWIB());
    tick();
    setToday(dateWIB({ day: "numeric", month: "short", year: "numeric" }));
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const stamp = (): Stamp => {
    const n = nowWIB();
    return { h: n.h, m: n.m };
  };

  const step = !clockIn ? "in" : !clockOut ? "out" : "done";
  const onPress = () => {
    if (step === "in") setClockIn(stamp());
    else if (step === "out") setClockOut(stamp());
    else {
      setClockIn(undefined);
      setClockOut(undefined);
    }
  };

  const si = inStatus(clockIn);
  const so = outStatus(clockOut);
  const clock = now ? `${pad(now.h)}:${pad(now.m)}:${pad(now.s)} WIB` : "--:--:-- WIB";

  return (
    <div data-ui className={cn("flex h-full w-full flex-col bg-[#F5F6F8] text-[13px] text-[#1F2937]", className)}>
      <div className="flex items-center justify-between bg-app px-4 pb-3 pt-2 text-white">
        <span className="text-[14px] font-bold tracking-wide">HOME</span>
        <span className="text-[12px] tabular-nums opacity-90" aria-label="Jam sekarang, WIB">
          {clock}
        </span>
      </div>

      <div className="p-3">
        <p className="mb-2.5 text-[15px] font-medium text-[#111827]">Menu Presensi</p>
        <dl className="grid grid-cols-2 gap-2">
          <Tile label="Tanggal" value={today || "—"} note={now ? `Waktu: ${pad(now.h)}:${pad(now.m)}` : "Waktu: --:--"} />
          <Tile label="Office" value="08:00–16:45" note="Istirahat 12:00–12:45" />
          <Tile label="Clock In" value={fmt(clockIn)} note={si.text} noteTone={si.tone} live />
          <Tile label="Clock Out" value={fmt(clockOut)} note={so.text} noteTone={so.tone} live />
        </dl>

        <motion.button
          type="button"
          onClick={onPress}
          whileTap={{ scale: 0.96 }}
          className={cn(
            "relative mt-3 flex h-11 w-full items-center justify-center overflow-hidden rounded-[10px] text-[13px] font-semibold uppercase tracking-wide shadow-[0_2px_6px_rgba(16,24,40,.18)] transition-colors",
            step === "in" && "bg-app text-white hover:bg-brand-deep",
            step === "out" && "bg-alert text-white hover:bg-[#D92D20]",
            step === "done" && "bg-white text-brand ring-1 ring-[#D0D5DD] hover:bg-brand-sky"
          )}
        >
          {step !== "done" && <span aria-hidden className="absolute inset-0 animate-ping2 rounded-[10px] bg-white/20" />}
          <span className="relative">{step === "in" ? "Clock in" : step === "out" ? "Clock out" : "Ulangi simulasi"}</span>
        </motion.button>

        <p className="mb-2 mt-4 text-[15px] font-medium text-[#111827]">Menu Pengajuan</p>
        <ul className="grid grid-cols-4 gap-2 text-center text-[10px] text-[#374151]" aria-label="Menu pengajuan di aplikasi">
          {menu.map((m) => (
            <li key={m.label} className="flex flex-col items-center gap-1">
              <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-white ring-1 ring-[#E5E7EB]", m.tone)}>
                <m.icon size={17} />
              </span>
              {m.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex items-center justify-around bg-white px-3 pb-5 pt-2.5 text-[#9CA3AF] ring-1 ring-[#E5E7EB]" aria-hidden>
        <Home size={20} className="text-app" />
        <FileText size={20} />
        <Bell size={20} />
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-app text-white">
          <MenuIcon size={18} />
        </span>
      </div>
    </div>
  );
}

function Tile({ label, value, note, noteTone, live }: { label: string; value: string; note: string; noteTone?: string; live?: boolean }) {
  return (
    <div className="rounded-[10px] bg-white p-2.5 ring-1 ring-[#E5E7EB]">
      <dt className="text-[11.5px] text-[#374151]">{label}</dt>
      <dd>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={value}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-0.5 block whitespace-nowrap text-[15px] font-semibold tabular-nums text-[#111827]"
          >
            {value}
          </motion.span>
        </AnimatePresence>
        <span className={cn("mt-0.5 block text-[11px] leading-snug", noteTone ?? "text-[#6B7280]")} aria-live={live ? "polite" : undefined}>
          {note}
        </span>
      </dd>
    </div>
  );
}
