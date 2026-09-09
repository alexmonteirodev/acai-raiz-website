import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

/**
 * No Next 16 o antigo `middleware.ts` se chama `proxy.ts` — mesma função.
 * Aqui ele negocia o idioma e reescreve / para o segmento [locale].
 */
export default createMiddleware(routing);

export const config = {
  // tudo, menos rotas de API, assets do Next e arquivos com extensão
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
