import Link from "next/link";
import Seo from "@/components/Seo";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <>
      <Seo title="Halaman tidak ditemukan — SIAP" path="/404" noindex />
      <main className="frame flex min-h-svh flex-col justify-center gap-6 py-20">
        <Link href="/" aria-label="SIAP — beranda">
          <Logo />
        </Link>
        <h1 className="h-display max-w-[14ch]">Halaman ini tidak ada</h1>
        <p className="max-w-[44ch] text-[18px] text-ink">Tautannya mungkin salah ketik atau halamannya sudah dipindahkan.</p>
        <div>
          <Link href="/" className="btn-primary">
            Kembali ke beranda
          </Link>
        </div>
      </main>
    </>
  );
}
