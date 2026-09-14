import igPrateleira from "@/assets/instagram/01-prateleira.jpg";
import igTrioMesa from "@/assets/instagram/02-trio-mesa.jpg";
import igAcaizeiro from "@/assets/instagram/03-acaizeiro.jpg";
import igTigela from "@/assets/instagram/04-tigela.jpg";
import igMaoAcai from "@/assets/instagram/mao-acai.jpg";
import igFrutos from "@/assets/instagram/06-frutos-carocos.jpg";
import origemEquipe from "@/assets/origem/equipe.jpg";
import origemFamiliaAcaizal from "@/assets/origem/familia-acaizal.jpg";
import origemFamiliaTerreiro from "@/assets/origem/familia-terreiro.jpg";
import origemProdutor from "@/assets/origem/produtor.jpg";
import origemVisita from "@/assets/origem/visita.jpg";
import trio from "@/assets/produtos-trio.png";
import fotoAcai from "@/assets/essencia-acai.jpg";
import fotoCacau from "@/assets/essencia-cacau.jpg";
import fotoCafe from "@/assets/essencia-cafe.jpg";

/**
 * Dados das seções que não são tradução.
 *
 * A regra é a mesma de `produtos.ts`: número, id e ordem vivem aqui; todo
 * texto visível vive em `messages/*.json`, encontrado pelo `id`. Assim um
 * número não fica escrito em dois idiomas diferentes por engano.
 */

/**
 * Seção "Nossos números". O rótulo de cada um vem de `numeros.<id>`.
 *
 * `valor` é número, não string, porque a seção anima a contagem até ele. O
 * sufixo fica separado justamente para não entrar na conta.
 */
export const NUMEROS = [
  { id: "produtos", valor: 3, sufixo: "" },
  { id: "parceiros", valor: 80, sufixo: "+" },
  { id: "toneladas", valor: 6, sufixo: "+" },
  { id: "vendidos", valor: 9000, sufixo: "+" },
] as const;

/** Seção "Nossa essência". A foto e o texto de cada pilar. */
export const ESSENCIA = [
  { id: "cafe", img: fotoCafe },
  { id: "cacau", img: fotoCacau },
  { id: "acai", img: fotoAcai },
] as const;

/**
 * Fotos que passam na moldura da seção "Origem", nesta ordem. A descrição de
 * cada uma vem de `origem.fotos.<id>` — é ela que conta a foto para quem não
 * a vê. A primeira é a que fica parada: é ela que o HTML do servidor entrega
 * e a única que aparece para quem pediu menos movimento.
 *
 * `foco` é o `object-position` do recorte. A moldura é um retrato 4:5, então
 * as duas fotos horizontais perdem as laterais: a da visita é recortada pela
 * esquerda, onde está quem tira a selfie, e as demais pelo centro.
 */
export const ORIGEM_FOTOS = [
  { id: "equipe", img: origemEquipe, foco: "center" },
  { id: "familiaAcaizal", img: origemFamiliaAcaizal, foco: "center" },
  { id: "familiaTerreiro", img: origemFamiliaTerreiro, foco: "center" },
  { id: "produtor", img: origemProdutor, foco: "center" },
  { id: "visita", img: origemVisita, foco: "left" },
] as const;

/** Etapas do processo, na seção "Origem". O título vem de `origem.etapas.<id>`. */
export const ETAPAS = [
  { id: "colheita", n: "01" },
  { id: "caroco", n: "02" },
  { id: "torra", n: "03" },
  { id: "envase", n: "04" },
] as const;

/**
 * Depoimentos de parceiros. Ainda são o placeholder do design — quem escreve
 * o texto real troca em `messages/*.json`, no namespace `depoimentos.<id>`.
 */
export const DEPOIMENTOS = ["um", "dois", "tres"] as const;

/**
 * Grade do Instagram: 6 quadros. A legenda de cada um vem de
 * `instagram.fotos.<id>`, e é ela que descreve a foto para quem não a vê.
 *
 * O quadro `trio` reaproveita a mesma imagem da seção de produtos em vez de
 * duplicar 5 MB no repo.
 */
export const GALERIA = [
  { id: "trioMesa", img: igTrioMesa },
  { id: "acaizeiro", img: igAcaizeiro },
  { id: "prateleira", img: igPrateleira },
  { id: "tigela", img: igTigela },
  { id: "trio", img: igMaoAcai },
  { id: "frutos", img: igFrutos },
] as const;
