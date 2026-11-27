import { motion } from "framer-motion";
import { BrainCircuit, Handshake, Plug, Server, ShieldCheck, Users } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./motion";

const reasons = [
  { icon: Server, t: "Pusat data lokal", d: "Data disimpan dan dikelola di Indonesia, jadi data sensitif karyawan tidak keluar negeri.", tone: "from-[#2D8CEB] to-[#0E3FA8]" },
  { icon: ShieldCheck, t: "Standar ISO 27001", d: "Perlindungan data perusahaan mengikuti standar keamanan informasi internasional.", tone: "from-[#12B886] to-[#087F5B]" },
  { icon: Handshake, t: "Pendampingan terdedikasi", d: "Implementasi didampingi gratis, dengan manajer akun khusus untuk perusahaan Anda.", tone: "from-[#FF922B] to-[#E8590C]" },
  { icon: Plug, t: "Siap diintegrasikan", d: "Open API untuk menyambungkan SIAP ke ERP, payroll, maupun software bisnis lain.", tone: "from-[#845EF7] to-[#5F3DC4]" },
  { icon: BrainCircuit, t: "Analitik berbantuan AI", d: "Data kehadiran diolah otomatis menjadi insight HR yang bisa langsung dipakai.", tone: "from-[#22B8CF] to-[#0B7285]" },
  { icon: Users, t: "Komunitas HR", d: "Ruang berbagi praktik dengan sesama pengguna untuk terus memperbaiki proses HR.", tone: "from-[#F06595] to-[#C2255C]" },
];

export default function WhySiap() {
  return (
    <section aria-labelledby="judul-kenapa" className="relative pb-12 pt-24 lg:pb-16 lg:pt-32">
      <div className="frame">
        <div className="grid items-end gap-6 lg:grid-cols-2">
          <Reveal>
            <p className="kicker">Kenapa SIAP</p>
            <h2 id="judul-kenapa" className="h-section mt-5 max-w-[15ch]">
              Aman, didampingi, dan <span className="text-gradient-brand">mudah disambungkan</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead max-w-[30rem] lg:ml-auto">Bukan sekadar aplikasi absen. SIAP dibangun untuk perusahaan yang butuh keamanan data, dukungan nyata, dan sistem yang bisa tumbuh.</p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {reasons.map((r) => (
            <StaggerItem key={r.t}>
              <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="card group relative h-full overflow-hidden p-7 hover:shadow-lift">
                <div aria-hidden className={`absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${r.tone} opacity-[0.08] transition-transform duration-500 group-hover:scale-[1.8]`} />
                <motion.span
                  whileHover={{ rotate: -8, scale: 1.08 }}
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${r.tone} text-white shadow-[0_12px_24px_-10px_rgba(11,27,58,.45)]`}
                >
                  <r.icon size={26} />
                </motion.span>
                <h3 className="relative mt-6 text-[20px]">{r.t}</h3>
                <p className="relative mt-3 text-[15px] leading-[1.7] text-soft">{r.d}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
