import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "katex/dist/katex.min.css";
import ThemeProvider from "@/components/ThemeProvider";
import LangProvider from "@/components/LangProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Habanero Cheeseburger",
  description: "A digital hub for my past projects.",
};

const initScript = `
  (function() {
    try {
      var storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', storedTheme);
      } else {
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      }

      var storedLang = localStorage.getItem('lang');
      if (storedLang === 'en' || storedLang === 'fr') {
        document.documentElement.setAttribute('lang', storedLang);
      } else {
        var browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
        document.documentElement.setAttribute('lang', browserLang.indexOf('fr') === 0 ? 'fr' : 'en');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }) {
  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Habanero Cheeseburger",
    "description": "A digital hub for maker projects and hardware builds.",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(siteSchema)}</script>
        <Script id="theme-lang-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <LangProvider>
            {children}
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

