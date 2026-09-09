import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/site";

import "../globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// pré-renderiza os três idiomas no build
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// html lang precisa do código BCP 47 completo; o segmento da URL é só "pt"
const HTML_LANG = { pt: "pt-BR", en: "en", es: "es" } as const;

// PT mora na raiz (localePrefix as-needed), então não ganha prefixo
const caminho = (locale: string) => (locale === routing.defaultLocale ? "/" : `/${locale}`);

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "head" });

  return {
    metadataBase: new URL(SITE.dominio),
    title: t("title"),
    alternates: {
      canonical: caminho(locale),
      languages: {
        ...Object.fromEntries(
          routing.locales.map((cod) => [HTML_LANG[cod], caminho(cod)]),
        ),
        "x-default": "/",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html
      lang={HTML_LANG[locale]}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
