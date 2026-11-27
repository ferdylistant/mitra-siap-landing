export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const site = {
  name: "SIAP",
  appName: "SIAP Andi Presensi",
  title: "SIAP — Aplikasi Absensi Karyawan Online di HP",
  description:
    "SIAP adalah aplikasi absensi karyawan online di HP: clock-in & clock-out, cuti, izin, lembur, dan rekap kehadiran otomatis untuk perusahaan multi-cabang.",
  keywords: [
    "aplikasi absensi karyawan",
    "aplikasi absensi online",
    "absensi online HP",
    "aplikasi presensi karyawan",
    "absensi tanpa fingerprint",
    "aplikasi cuti dan lembur",
    "rekap absensi otomatis",
    "absensi multi cabang",
    "SIAP Andi Presensi",
    "Andi Global Soft",
  ],
  locale: "id_ID",
  ogImage: "/images/og-siap.png",
  themeColor: "#0E3FA8",
  company: {
    name: "Andi Global Soft",
    url: "https://andiglobalsoft.com",
    email: "andiglobalsoft@gmail.com",
    phone: "0811-2936-865",
    phoneE164: "+628112936865",
    whatsapp: "628112936865",
    city: "Yogyakarta",
    address: {
      street: "Jl. Beo No. 38–40, Mrican, Caturtunggal, Depok",
      locality: "Sleman",
      region: "DI Yogyakarta",
      postalCode: "55281",
      country: "ID",
    },
    sameAs: ["https://andiglobalsoft.com", "https://www.instagram.com/andiglobalsoft"],
  },
  appStoreUrl: process.env.NEXT_PUBLIC_APP_STORE_URL || "",
  playStoreUrl: process.env.NEXT_PUBLIC_PLAY_STORE_URL || "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
} as const;

export const nav = [
  { href: "#fitur", label: "Fitur" },
  { href: "#tampilan", label: "Tampilan" },
  { href: "#cara-kerja", label: "Cara kerja" },
  { href: "#faq", label: "FAQ" },
] as const;

export const waLink = (text = "Halo, saya ingin tahu lebih lanjut tentang aplikasi absensi SIAP.") =>
  `https://wa.me/${site.company.whatsapp}?text=${encodeURIComponent(text)}`;

export const clients = [
  { src: "/images/clients/sorwit.webp", name: "Warung Sorwit", w: 160, h: 160 },
  { src: "/images/clients/istana-buah.webp", name: "Istana Buah", w: 160, h: 160 },
  { src: "/images/clients/rs-nirmala.webp", name: "Rumah Sakit Nirmala", w: 160, h: 160 },
  { src: "/images/clients/ags.webp", name: "Andi Global Soft", w: 160, h: 160 },
  { src: "/images/clients/andi-publisher.webp", name: "Andi Publisher", w: 160, h: 160 },
  { src: "/images/clients/mutiara.webp", name: "Mutiara Pusat Kosmetik Yogyakarta", w: 160, h: 160 },
];

export const faqs = [
  {
    q: "Apakah SIAP bisa dipakai tanpa perangkat tambahan?",
    a: "Bisa. Karyawan absen langsung dari smartphone masing-masing, tanpa mesin fingerprint.",
  },
  {
    q: "Apakah data absensi tersimpan aman?",
    a: "Data disimpan di server lokal di Indonesia dan dilindungi enkripsi sesuai standar keamanan data.",
  },
  {
    q: "Apakah SIAP mendukung banyak cabang?",
    a: "Ya. Absensi karyawan dari banyak cabang dikelola dalam satu dashboard.",
  },
  {
    q: "Bisakah SIAP diintegrasikan dengan sistem HR atau payroll?",
    a: "Bisa. SIAP menyediakan API untuk integrasi dengan sistem HR, payroll, maupun ERP.",
  },
  {
    q: "Apakah tersedia laporan absensi?",
    a: "Tersedia laporan harian, bulanan, dan rekap otomatis yang dapat diunduh.",
  },
  {
    q: "Di perangkat apa SIAP bisa dipakai?",
    a: "Aplikasi karyawan tersedia untuk iPhone dan Android, sedangkan HR dapat mengelola semuanya lewat dashboard web.",
  },
  {
    q: "Bagaimana cara mulai memakai SIAP?",
    a: "Hubungi tim kami lewat WhatsApp untuk jadwal demo. Implementasi didampingi gratis sampai sistem berjalan.",
  },
];
