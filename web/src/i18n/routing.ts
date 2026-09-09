import { defineRouting } from "next-intl/routing";

/**
 * `as-needed` mantém as URLs que já existem e estão indexadas: PT na raiz,
 * EN em /en, ES em /es. Trocar para `always` mandaria o PT para /pt e
 * quebraria todo link externo e o sitemap.xml do site atual.
 */
export const routing = defineRouting({
  locales: ["pt", "en", "es"],
  defaultLocale: "pt",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
