/**
 * Dados de contato do negócio. Um lugar só — no site antigo o número do
 * WhatsApp aparecia solto em vários pontos do HTML e do JS.
 */
export const SITE = {
  nome: "Açaí Raiz",
  dominio: "https://www.acairaiz.com",
  whatsapp: "5579991198907",
  instagram: "acairaiz20",
  instagramUrl: "https://www.instagram.com/acairaiz20",
  // sim, com o "ai" trocado — é o endereço real, não corrigir
  email: "acairaiaz20@gmail.com",
  // reportagem do Sergipe Rural; t=424 é o segundo em que a matéria começa
  reportagemUrl: "https://youtu.be/a8TZoOlsLAQ?t=424",
  reportagemId: "a8TZoOlsLAQ",
} as const;

export const whatsappUrl = (texto?: string) =>
  `https://wa.me/${SITE.whatsapp}` +
  (texto ? `?text=${encodeURIComponent(texto)}` : "");
