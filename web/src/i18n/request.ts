import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";

import { routing } from "./routing";

/**
 * O locale vem de `next/root-params` (segmento [locale]) e não do
 * `requestLocale` do next-intl, que está deprecado a partir do Next 16.
 *
 * O segmento funciona como catch-all, então valores inválidos (/robots.txt,
 * /qualquer-coisa) chegam aqui e caem no defaultLocale em vez de estourar.
 */
export default getRequestConfig(async () => {
  const requested = await rootLocale();
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    // fixo: sem isto o next-intl usa o fuso da máquina que renderiza, e
    // servidor e navegador formatam data/hora diferente
    timeZone: "America/Maceio",
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
