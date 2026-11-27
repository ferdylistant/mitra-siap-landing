# SIAP — Landing Page

Landing page aplikasi absensi karyawan **SIAP** (Andi Global Soft). Next.js 16 (pages router) + Tailwind CSS 3, satu halaman di `/`.

## Menjalankan

```bash
cp .env.example .env      # lalu isi NEXT_PUBLIC_SITE_URL dengan domain asli
npm install
npm run dev               # http://localhost:3000
npm run build && npm start
```

`npm run build` juga membuat `public/sitemap.xml` dan `public/robots.txt` (next-sitemap).

## Variabel lingkungan

| Nama | Wajib | Fungsi |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Ya | Domain publik. Dipakai untuk canonical, Open Graph, JSON-LD, sitemap, robots. Dibaca saat build. |
| `NEXT_PUBLIC_GTM_ID` | Tidak | Google Tag Manager. Kosong = tidak dimuat. |
| `NEXT_PUBLIC_APP_STORE_URL` | Tidak | Tombol App Store hanya tampil bila diisi. |
| `NEXT_PUBLIC_PLAY_STORE_URL` | Tidak | Tombol Google Play hanya tampil bila diisi. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Tidak | Kode verifikasi Google Search Console. |

## Struktur

```
src/
  pages/        index.tsx, 404.tsx, _app.tsx, _document.tsx
  components/   satu file per bagian halaman (Hero, Features, Showcase, ...), Seo.tsx
  lib/site.ts   SEMUA konten & kontak (nama, deskripsi SEO, WhatsApp, klien, FAQ)
  styles/       globals.css (token, tombol, animasi masuk)
public/images/  screenshot aplikasi, logo klien, logo SIAP, gambar OG
```

Konten teks, nomor WhatsApp, email, alamat, daftar klien, dan FAQ diubah di `src/lib/site.ts`. FAQ di sana otomatis ikut ke data terstruktur `FAQPage`.

URL lama `/siap` diarahkan permanen (308) ke `/`.
