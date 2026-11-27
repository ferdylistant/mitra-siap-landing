import { Html, Head, Main, NextScript } from "next/document";
import { site } from "@/lib/site";

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="32x32 48x48" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content={site.themeColor} />
        <meta name="application-name" content={site.name} />
        <meta name="apple-mobile-web-app-title" content={site.name} />
        <meta name="format-detection" content="telephone=no" />
        {site.googleVerification && <meta name="google-site-verification" content={site.googleVerification} />}
      </Head>
      <body>
        {site.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${site.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
