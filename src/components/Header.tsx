import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { ease } from "./motion";
import { nav, waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a href="#konten" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
        Lewati ke konten
      </a>
      <div
        className={cn(
          "transition-[background-color,box-shadow,backdrop-filter] duration-300",
          solid ? "bg-white/90 shadow-[0_1px_0_rgba(11,27,58,.06),0_10px_30px_-12px_rgba(11,27,58,.18)] backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <div className={cn("frame flex items-center justify-between transition-[height] duration-300", solid ? "h-[68px]" : "h-[84px]")}>
          <a href="#beranda" aria-label="SIAP — kembali ke atas" onClick={() => setOpen(false)}>
            <Logo light={!solid} />
          </a>

          <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-[15px] font-medium transition-colors",
                  solid ? "text-ink hover:bg-brand-sky hover:text-brand" : "text-white/85 hover:bg-white/10 hover:text-white"
                )}
              >
                {item.label}
              </a>
            ))}
            <a
              href={waLink("Halo, saya ingin menjadwalkan demo aplikasi absensi SIAP.")}
              target="_blank"
              rel="noopener"
              className={cn("ml-3 min-h-[44px] px-5", solid ? "btn-primary" : "btn-white")}
            >
              Jadwalkan demo
            </a>
          </nav>

          <button
            type="button"
            className={cn("-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full md:hidden", solid ? "text-ink" : "text-white")}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease }}
            className="absolute inset-x-0 top-full h-[calc(100svh-68px)] bg-white md:hidden"
          >
            <nav aria-label="Navigasi seluler" className="frame flex flex-col pt-6">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease, delay: 0.05 + i * 0.05 }}
                  className="py-3 text-[30px] font-bold tracking-[-0.03em] text-ink"
                >
                  {item.label}
                </motion.a>
              ))}
              <a href={waLink("Halo, saya ingin menjadwalkan demo aplikasi absensi SIAP.")} target="_blank" rel="noopener" className="btn-primary mt-8 w-full">
                Jadwalkan demo
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
