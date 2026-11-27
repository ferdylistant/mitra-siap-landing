import Image from "next/image";
import { motion } from "framer-motion";
import { Bot, Building2, Clock4, Coffee, FileCheck2, Fingerprint } from "lucide-react";
import TiltCard from "./TiltCard";
import PhoneFrame from "./PhoneFrame";
import { Reveal, Stagger, StaggerItem } from "./motion";

const cities = ["Yogyakarta", "Jakarta", "Makassar", "Banjarmasin", "Cirebon"];

export default function Features() {
  return (
    <section id="fitur" aria-labelledby="judul-fitur" className="relative py-24 lg:py-32">
      <div className="frame">
        <Reveal className="mx-auto max-w-[44rem] text-center">
          <p className="kicker">
            <Fingerprint size={15} /> Fitur unggulan
          </p>
          <h2 id="judul-fitur" className="h-section mt-5">
            Semua urusan kehadiran, <span className="text-gradient-brand">beres di satu aplikasi</span>
          </h2>
          <p className="lead mx-auto mt-5 max-w-[36rem]">
            Dari jam masuk sampai rekap akhir bulan. Karyawan cukup membuka HP, HR tinggal memantau dashboard.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          {/* Besar: clock-in */}
          <StaggerItem className="md:col-span-2 lg:col-span-4 lg:row-span-2">
            <TiltCard max={4} className="bg-gradient-to-br from-brand to-brand-deep text-white">
              <div className="grid h-full gap-6 p-7 sm:grid-cols-[1fr_auto] sm:p-10">
                <div className="flex flex-col">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                    <Clock4 size={24} />
                  </span>
                  <h3 className="mt-6 text-[26px] text-white sm:text-[32px]">Clock-in dari HP, tanpa mesin fingerprint</h3>
                  <p className="mt-4 max-w-[26rem] text-[16px] leading-[1.7] text-[#d5e4ff]">
                    Satu ketukan untuk absen. Jam masuk tercatat bersama statusnya, tepat waktu atau terlambat sekian menit, lengkap dengan jadwal shift dan jam istirahat.
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-8 text-[13px] font-semibold">
                    {["Shift kerja", "Jam istirahat", "Status otomatis"].map((t) => (
                      <li key={t} className="rounded-full bg-white/[0.12] px-3 py-1.5 ring-1 ring-inset ring-white/20">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative -mb-24 hidden justify-self-end sm:block" style={{ transform: "translateZ(50px)" }}>
                  <PhoneFrame src="/images/screens/beranda.webp" alt="Beranda SIAP: menu pengajuan dan menu presensi" className="w-[230px] rotate-[6deg] transition-transform duration-500 group-hover:rotate-[2deg] group-hover:-translate-y-3" sizes="230px" />
                </div>
              </div>
            </TiltCard>
          </StaggerItem>

          <StaggerItem className="h-full lg:col-span-2">
            <TiltCard className="card">
              <div className="p-7">
                <Icon tone="bg-[#E6F6F0] text-ok">
                  <FileCheck2 size={22} />
                </Icon>
                <h3 className="mt-5 text-[21px]">Cuti, izin & lembur dari aplikasi</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-soft">Atasan menyetujui lewat menu Persetujuan; status Approved atau Rejected langsung terlihat.</p>
                <div className="mt-6 flex gap-2 text-[12px] font-semibold">
                  <motion.span whileHover={{ scale: 1.06 }} className="rounded-full bg-[#E6F6F0] px-3 py-1.5 text-ok">Approved</motion.span>
                  <motion.span whileHover={{ scale: 1.06 }} className="rounded-full bg-[#FEE4E2] px-3 py-1.5 text-alert">Rejected</motion.span>
                  <motion.span whileHover={{ scale: 1.06 }} className="rounded-full bg-[#FEF0C7] px-3 py-1.5 text-[#B54708]">Menunggu</motion.span>
                </div>
              </div>
            </TiltCard>
          </StaggerItem>

          <StaggerItem className="h-full lg:col-span-2">
            <TiltCard className="card">
              <div className="p-7">
                <Icon tone="bg-brand-sky text-brand">
                  <Building2 size={22} />
                </Icon>
                <h3 className="mt-5 text-[21px]">Semua cabang, satu dashboard</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-soft">Karyawan di banyak kota dikelola dari tempat yang sama.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cities.map((c, i) => (
                    <motion.span
                      key={c}
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 260, damping: 18 }}
                      className="rounded-full bg-brand-sky px-3 py-1.5 text-[12px] font-semibold text-brand"
                    >
                      {c}
                    </motion.span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </StaggerItem>

          <StaggerItem className="h-full md:col-span-2 lg:col-span-3">
            <TiltCard className="card">
              <div className="grid h-full items-center gap-6 p-7 sm:grid-cols-[1fr_200px]">
                <div>
                  <Icon tone="bg-brand-mist text-brand-deep">
                    <FileCheck2 size={22} />
                  </Icon>
                  <h3 className="mt-5 text-[21px]">Rekap bulanan tersusun sendiri</h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-soft">Sisa hari kerja, terlambat, pulang cepat, dan tidak clock-out dihitung otomatis per karyawan.</p>
                </div>
                <div className="overflow-hidden rounded-2xl ring-1 ring-[#0B1B3A]/[0.08]">
                  <Image src="/images/screens/daftar-presensi.webp" alt="Rekap kehadiran bulanan di SIAP" width={540} height={1006} sizes="200px" className="h-[180px] w-full object-cover object-[center_22%] transition-transform duration-500 group-hover:scale-105" />
                </div>
              </div>
            </TiltCard>
          </StaggerItem>

          <StaggerItem className="h-full md:col-span-2 lg:col-span-3">
            <div className="grid h-full gap-5 sm:grid-cols-2 lg:gap-6">
              <TiltCard className="card">
                <div className="p-7">
                  <Icon tone="bg-[#FFF0E8] text-[#E8590C]">
                    <Coffee size={22} />
                  </Icon>
                  <h3 className="mt-5 text-[19px]">Istirahat telat ikut tercatat</h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-soft">Yang kembali melewati jam istirahat masuk daftar Istirahat Telat.</p>
                </div>
              </TiltCard>
              <TiltCard className="card">
                <div className="p-7">
                  <Icon tone="bg-[#EEF0FF] text-[#4F46E5]">
                    <Bot size={22} />
                  </Icon>
                  <h3 className="mt-5 text-[19px]">Chatbot bantuan</h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-soft">Karyawan bertanya langsung dari aplikasi tanpa menunggu HR.</p>
                </div>
              </TiltCard>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

function Icon({ tone, children }: { tone: string; children: React.ReactNode }) {
  return <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}>{children}</span>;
}
