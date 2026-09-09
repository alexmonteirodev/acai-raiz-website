import type messages from "../messages/pt.json";
import type { routing } from "@/i18n/routing";

/**
 * Faz o TypeScript conhecer as chaves de tradução: `t("hero.titl")` vira erro
 * de compilação em vez de string faltando em produção. PT é a referência
 * porque é a língua em que o conteúdo é escrito.
 */
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
