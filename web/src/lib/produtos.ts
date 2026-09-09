/**
 * Fonte única de verdade dos produtos.
 *
 * No site antigo o preço vivia em três lugares independentes (card, item do
 * carrinho e argumento de `changeQty`) e o terceiro já tinha divergido.
 * Preço, peso e imagem moram aqui e em nenhum outro lugar.
 *
 * Nome NÃO é traduzido: "Café do grão de açaí" é o que está impresso na
 * embalagem. Descrição e textos de acessibilidade vêm de `messages/*.json`,
 * no namespace `produtos.<id>` — os ids abaixo são as chaves de lá.
 */
export const PRODUTOS = [
  {
    id: "cafe-grao",
    nome: "Café do grão de açaí",
    preco: 27,
    peso: "250g",
    img: "/produtos/cafe-grao.jpg",
  },
  {
    id: "blend-cacau",
    nome: "Blend cacau",
    preco: 27,
    peso: "250g",
    img: "/produtos/blend-cacau.jpg",
  },
  {
    id: "blend-cafe",
    nome: "Blend Café Açaí",
    preco: 27,
    peso: "250g",
    img: "/produtos/blend-cafe.jpg",
  },
] as const;

export type Produto = (typeof PRODUTOS)[number];
export type ProdutoId = Produto["id"];

export const produtoPorId = (id: ProdutoId) =>
  PRODUTOS.find((p) => p.id === id);

export const brl = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
