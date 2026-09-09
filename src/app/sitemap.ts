import type { MetadataRoute } from "next";

import { HTML_LANG, caminhoDoLocale, routing } from "@/i18n/routing";
import { SITE } from "@/lib/site";

/**
 * Substitui o sitemap.xml estático do site antigo, mantendo a mesma forma:
 * uma entrada por idioma, cada uma listando as alternativas em hreflang.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (locale: (typeof routing.locales)[number]) =>
    new URL(caminhoDoLocale(locale), SITE.dominio).toString();

  const languages = Object.fromEntries(
    routing.locales.map((cod) => [HTML_LANG[cod], url(cod)]),
  );

  return routing.locales.map((locale) => ({
    url: url(locale),
    alternates: {
      languages: { ...languages, "x-default": url(routing.defaultLocale) },
    },
  }));
}
