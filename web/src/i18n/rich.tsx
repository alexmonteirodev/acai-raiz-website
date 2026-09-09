import type { ReactNode } from "react";

/**
 * Callbacks das tags que aparecem dentro das traduções.
 *
 * O texto no dicionário carrega marcação (`<br></br>`, `<em>`, `<strong>`,
 * `<link>`) porque quebra de linha e ênfase mudam de lugar em cada idioma.
 * Duas regras do ICU que o site antigo não tinha:
 *   1. não existe tag autofechada — é `<br></br>`, nunca `<br />`;
 *   2. tag não leva atributo — o href fica aqui, não no JSON.
 *
 * Use sempre `t.rich(chave, TAGS)`, nunca dangerouslySetInnerHTML.
 */
export const TAGS = {
  br: () => <br />,
  em: (chunks: ReactNode) => <em>{chunks}</em>,
  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
} as const;

/**
 * Para mensagens com `<link>`, cujo href não cabe no dicionário:
 * `t.rich("video.cap", { ...TAGS, link: (c) => linkExterno(SITE.reportagemUrl, c) })`
 */
export function linkExterno(href: string, chunks: ReactNode) {
  return (
    <a href={href} target="_blank" rel="noopener">
      {chunks}
    </a>
  );
}
