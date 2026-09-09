import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Anton, Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";

import { HTML_LANG, caminhoDoLocale, routing } from "@/i18n/routing";
import { SITE } from "@/lib/site";

import "../globals.css";

// As quatro famílias do design. Anton nos títulos, Archivo nos rótulos
// fortes, Instrument Sans no corpo e JetBrains Mono nos eyebrows.
const anton = Anton({ variable: "--fonte-anton", weight: "400", subsets: ["latin"] });
const archivo = Archivo({ variable: "--fonte-archivo", subsets: ["latin"] });
const instrument = Instrument_Sans({ variable: "--fonte-instrument", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--fonte-jetbrains", subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "head" });

  return {
    metadataBase: new URL(SITE.dominio),
    title: t("title"),
    description: t("desc"),
    alternates: {
      canonical: caminhoDoLocale(locale),
      languages: {
        ...Object.fromEntries(
          routing.locales.map((cod) => [HTML_LANG[cod], caminhoDoLocale(cod)]),
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
      className={`${anton.variable} ${archivo.variable} ${instrument.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-creme text-tinta">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
