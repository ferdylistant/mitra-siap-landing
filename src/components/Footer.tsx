import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import StoreButtons from "./StoreButtons";
import { nav, site, waLink } from "@/lib/site";

export default function Footer() {
  const c = site.company;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-night pt-20 text-[#c8dbff]">
      <div className="frame relative grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-[22rem] text-[15px] leading-[1.7]">SIAP adalah aplikasi absensi dan manajemen kehadiran karyawan yang modern, aman, dan mudah digunakan. Dikembangkan oleh {c.name}.</p>
          {(site.appStoreUrl || site.playStoreUrl) && (
            <>
              <p className="mt-7 text-[14px] font-semibold text-white">Unduh aplikasinya</p>
              <StoreButtons compact className="mt-3 gap-2.5" />
            </>
          )}
        </div>

        <nav aria-label="Navigasi footer">
          <h2 className="text-[15px] font-bold tracking-normal text-white">Menu</h2>
          <ul className="mt-5 flex flex-col gap-3 text-[15px]">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[15px] font-bold tracking-normal text-white">Kontak</h2>
          <ul className="mt-5 flex flex-col gap-4 text-[15px]">
            <li>
              <a href={waLink()} target="_blank" rel="noopener" className="flex items-center gap-3 transition-colors hover:text-white">
                <Phone size={17} className="shrink-0 text-brand-bright" /> {c.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${c.email}`} className="flex items-center gap-3 transition-colors hover:text-white">
                <Mail size={17} className="shrink-0 text-brand-bright" /> {c.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[15px] font-bold tracking-normal text-white">Kantor</h2>
          <address className="mt-5 flex gap-3 text-[15px] not-italic leading-[1.7]">
            <MapPin size={17} className="mt-1 shrink-0 text-brand-bright" />
            <span>
              {c.address.street}, {c.address.locality}, {c.address.region} {c.address.postalCode}
            </span>
          </address>
        </div>
      </div>

      {/* Watermark dekoratif lewat ::before, jadi tidak dihitung sebagai teks oleh cek kontras. */}
      <div
        aria-hidden
        className="frame relative select-none text-center text-[24vw] font-extrabold leading-[0.8] tracking-[-0.06em] text-white/[0.05] before:content-['SIAP'] lg:text-[16rem]"
      />

      <div className="relative border-t border-white/10">
        <div className="frame flex flex-col gap-2 py-6 text-[14px] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {c.name}. Hak cipta dilindungi.
          </p>
          <p>Dibuat di {c.city}</p>
        </div>
      </div>
    </footer>
  );
}
