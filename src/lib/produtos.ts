/**
 * Os três produtos da linha.
 *
 * O site não vende direto: não há preço nem carrinho, a conversão é virar
 * parceiro. Por isso aqui só mora o que identifica o produto.
 *
 * Nome NÃO é traduzido: é o que está impresso na embalagem. A descrição vem
 * de `messages/*.json`, em `produtos.itens.<id>.desc`.
 */
export const PRODUTOS = [
  { id: "cafe-grao", n: "01", tag: "PURO", nome: "Café do grão de açaí" },
  { id: "blend-cacau", n: "02", tag: "BLEND", nome: "Blend cacau e açaí" },
  { id: "blend-cafe", n: "03", tag: "BLEND", nome: "Blend café e açaí" },
] as const;

export type Produto = (typeof PRODUTOS)[number];
export type ProdutoId = Produto["id"];
