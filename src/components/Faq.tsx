import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Plus } from "lucide-react";
import { Reveal, Stagger, StaggerItem, ease } from "./motion";
import { faqs, waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="judul-faq" className="bg-brand-sky/60 py-24 lg:py-32">
      <div className="frame grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="kicker bg-white">FAQ</p>
          <h2 id="judul-faq" className="h-section mt-5 max-w-[14ch]">
            Pertanyaan yang <span className="text-gradient-brand">sering diajukan</span>
          </h2>
          <p className="lead mt-5 max-w-[26rem]">Belum menemukan jawabannya? Tim kami siap menjawab langsung.</p>
          <a href={waLink("Halo, saya punya pertanyaan tentang aplikasi absensi SIAP.")} target="_blank" rel="noopener" className="btn-primary mt-8">
            <MessageCircle size={18} /> Tanya lewat WhatsApp
          </a>
        </Reveal>

        <Stagger className="flex flex-col gap-3" gap={0.06}>
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <StaggerItem key={f.q}>
                <div className={cn("rounded-3xl bg-white transition-shadow duration-300", on ? "shadow-lift" : "shadow-card")}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpen(on ? null : i)}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[17px] font-semibold tracking-normal text-ink sm:px-7"
                    >
                      {f.q}
                      <motion.span
                        animate={{ rotate: on ? 45 : 0 }}
                        transition={{ duration: 0.3, ease }}
                        className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors", on ? "bg-brand text-white" : "bg-brand-sky text-brand")}
                      >
                        <Plus size={18} />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-[16px] leading-[1.7] text-soft sm:px-7">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
