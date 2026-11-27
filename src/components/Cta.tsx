import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PhoneFrame from "./PhoneFrame";
import { Reveal } from "./motion";
import { site, waLink } from "@/lib/site";

export default function Cta() {
  const [company, setCompany] = useState("");

  const message = () =>
    company.trim()
      ? `Halo, kami dari ${company.trim()} ingin menjadwalkan demo aplikasi absensi SIAP.`
      : "Halo, kami ingin menjadwalkan demo aplikasi absensi SIAP.";

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.open(waLink(message()), "_blank", "noopener");
  };

  return (
    <section id="kontak" aria-labelledby="judul-kontak" className="py-24 lg:py-32">
      <div className="frame">
        <Reveal className="hero-bg relative isolate overflow-hidden rounded-[36px] px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 id="judul-kontak" className="h-section max-w-[16ch] text-white">
                Siap merapikan absensi tim Anda?
              </h2>
              <p className="mt-5 max-w-[32rem] text-[17px] leading-[1.7] text-[#d5e4ff]">
                Tulis nama perusahaan Anda, lalu kami lanjutkan lewat WhatsApp untuk jadwal demo dan pendampingan implementasi gratis.
              </p>

              <form action={`https://wa.me/${site.company.whatsapp}`} method="get" target="_blank" onSubmit={onSubmit} className="mt-9 flex max-w-[34rem] flex-col gap-3 rounded-[22px] bg-white/10 p-2 ring-1 ring-inset ring-white/20 backdrop-blur sm:flex-row">
                <label htmlFor="cta-perusahaan" className="sr-only">
                  Nama perusahaan
                </label>
                <input
                  id="cta-perusahaan"
                  name="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Nama perusahaan Anda"
                  autoComplete="organization"
                  className="h-[52px] min-w-0 flex-1 rounded-2xl bg-transparent px-4 text-[16px] text-white placeholder:text-white/60 focus:outline-none"
                />
                <button type="submit" className="btn-white group h-[52px] rounded-2xl">
                  Jadwalkan demo
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>
              <p className="mt-4 text-[14px] text-[#c8dbff]">Demo dan pendampingan implementasi gratis. Atau email kami di {site.company.email}</p>
            </div>

            <div className="relative hidden h-[360px] [perspective:1200px] lg:block">
              <motion.div
                initial={{ rotateY: -30, rotateX: 12, y: 80, opacity: 0 }}
                whileInView={{ rotateY: -18, rotateX: 8, y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 60, damping: 16, delay: 0.2 }}
                className="absolute left-1/2 top-0 -ml-[130px]"
              >
                <div className="animate-float">
                  <PhoneFrame src="/images/screens/cuti.webp" alt="Layar pengajuan cuti SIAP" className="w-[260px]" sizes="260px" />
                </div>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
