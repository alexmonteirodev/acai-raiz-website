/**
 * Dados de contato do negócio. Um lugar só — no site antigo o número do
 * WhatsApp aparecia solto em vários pontos do HTML e do JS.
 */
export const SITE = {
  nome: "Açaí Raiz",
  dominio: "https://www.acairaiz.com",
  whatsapp: "5579991198907",
  instagram: "cafegraodoacai",
  instagramUrl:
    "https://www.instagram.com/cafegraodoacai?stkn=Mm5paDhyNmg2cXhj",
  // sim, com o "ai" trocado — é o endereço real, não corrigir
  email: "acairaiaz20@gmail.com",
  // Reportagem do Sergipe Rural. O programa é longo e a matéria sobre a Açaí
  // Raiz só começa aos 7:04 — daí o início em 424s, para o visitante não cair
  // em sete minutos de outro assunto.
  reportagemId: "a8TZoOlsLAQ",
  reportagemInicio: 424,
  reportagemUrl: "https://youtu.be/a8TZoOlsLAQ?t=424",
} as const;

export const whatsappUrl = (texto?: string) =>
  `https://wa.me/${SITE.whatsapp}` +
  (texto ? `?text=${encodeURIComponent(texto)}` : "");
