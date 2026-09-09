import { PRODUTOS, brl, produtoPorId, type ProdutoId } from "./produtos";
import { whatsappUrl } from "./site";

export type ItemDoPedido = { id: ProdutoId; qtd: number };

/**
 * A mensagem do pedido é SEMPRE em português, em qualquer idioma do site:
 * quem lê do outro lado é a atendente, não o visitante. Só a interface do
 * carrinho é traduzida.
 */
export function mensagemDoPedido(itens: readonly ItemDoPedido[]) {
  const linhas = ["🛒 *Pedido - Açaí Raiz*", ""];
  let total = 0;

  for (const { id, qtd } of itens) {
    const produto = produtoPorId(id);
    if (!produto || qtd <= 0) continue;
    const subtotal = produto.preco * qtd;
    total += subtotal;
    linhas.push(`• ${produto.nome} x${qtd} = ${brl(subtotal)}`);
  }

  if (total === 0) return null;

  linhas.push("", `*Total: ${brl(total)}*`);
  return linhas.join("\n");
}

/** `null` quando o carrinho está vazio — o chamador mostra o aviso traduzido. */
export function urlDoPedido(itens: readonly ItemDoPedido[]) {
  const mensagem = mensagemDoPedido(itens);
  return mensagem ? whatsappUrl(mensagem) : null;
}

export const totalDoPedido = (itens: readonly ItemDoPedido[]) =>
  itens.reduce(
    (soma, { id, qtd }) => soma + (produtoPorId(id)?.preco ?? 0) * Math.max(qtd, 0),
    0,
  );

export { PRODUTOS };
