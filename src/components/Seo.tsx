import Head from "next/head";
import { SITE_URL, faqs, site } from "@/lib/site";

type Props = {
  title?: string;
  description?: string;
  path?: string;
  noindex?: boolean;
  withSchema?: boolean;
};

export default function Seo({ title = site.title, description = site.description, path = "/", noindex, withSchema }: Props) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const image = `${SITE_URL}${site.ogImage}`;
  const c = site.company;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: c.name,
        url: c.url,
        logo: `${SITE_URL}/icon-512.png`,
        email: c.email,
        telephone: c.phoneE164,
        address: {
          "@type": "PostalAddress",
          streetAddress: c.address.street,
          addressLocality: c.address.locality,
          addressRegion: c.address.region,
          postalCode: c.address.postalCode,
          addressCountry: c.address.country,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: c.phoneE164,
          contactType: "sales",
          areaServed: "ID",
          availableLanguage: ["Indonesian"],
        },
        sameAs: c.sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: site.name,
        inLanguage: "id-ID",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#app`,
        name: site.appName,
        alternateName: site.name,
        description: site.description,
        url: `${SITE_URL}/`,
        image,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Aplikasi absensi karyawan",
        operatingSystem: "iOS, Android, Web",
        inLanguage: "id-ID",
        ...(site.appStoreUrl || site.playStoreUrl ? { installUrl: site.appStoreUrl || site.playStoreUrl } : {}),
        sameAs: [site.appStoreUrl, site.playStoreUrl].filter(Boolean),
        publisher: { "@id": `${SITE_URL}/#organization` },
        featureList: [
          "Clock-in dan clock-out dari HP",
          "Pengajuan cuti, izin, dan lembur",
          "Rekap kehadiran bulanan otomatis",
          "Pencatatan istirahat terlambat",
          "Pengelolaan karyawan multi-cabang",
          "API integrasi HR, payroll, dan ERP",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={site.keywords.join(", ")} />
      <meta name="author" content={c.name} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"} />
      {!noindex && <link rel="canonical" href={url} />}
      <link rel="alternate" hrefLang="id-ID" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content={site.locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="SIAP — absensi karyawan langsung dari HP" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="geo.region" content="ID-YO" />
      <meta name="geo.placename" content="Yogyakarta" />

      {withSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}
    </Head>
  );
}
