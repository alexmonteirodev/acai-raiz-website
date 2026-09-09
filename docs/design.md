# O design

O site implementa um design feito no **Claude Design**. O export original está
fora do repo, em `~/Downloads/Página de café de açaí/`, com dois artboards:

| Arquivo | O que é |
|---|---|
| `export/cafe-de-acai-figma.html` | **A referência.** Hero definido, seção "Nossa essência", dados reais |
| `export/acai-raiz-para-figma.html` | Versão anterior, mais wireframe. Superada pela de cima |
| `Cafe de Acai - Estrutura.dc.html` | Wireframe mobile (480px), só estrutura |
| `Cafe de Acai - Estrutura Web.dc.html` | Wireframe desktop, só estrutura |

`design-referencia.txt` neste diretório é a estrutura do artboard de referência
extraída em forma legível (um elemento por linha, com as medidas e cores que
importam). É o que consultar para conferir uma medida sem reabrir o export.

As imagens vieram embutidas no bundle do export e estão em `src/assets/`,
carregadas por import estático (o CLAUDE.md explica por que não em `public/`).

## O que o design definiu

- **Posicionamento B2B.** A conversão é virar revendedor ("Seja parceiro",
  "Quero ser parceiro"), não comprar. Não existe carrinho nem preço em lugar
  nenhum do design — foi o que aposentou o carrinho do site antigo.
- **Paleta** creme/marrom/oliva em oklch, nos tokens de `globals.css`.
- **Tipografia:** Anton (títulos), Archivo (rótulos fortes), Instrument Sans
  (corpo), JetBrains Mono (eyebrows).
- **Largura** de 1280px com 40px de respiro lateral.

## Adaptações que o design não cobre

O artboard é desktop (1280px fixo). O mobile foi derivado por aqui: grids
empilham, a nav vira menu, e as escalas tipográficas ganham degraus
(`text-[44px] sm:text-[58px] lg:text-[78px]`). O wireframe mobile do canvas
serviu de referência de intenção, não de medida.

O paralaxe dos selos do hero respeita `prefers-reduced-motion` e só reage a
ponteiro — no toque a cena fica parada, como deve.

## Ainda é placeholder do design

Estes textos vieram do design como exemplo e esperam o conteúdo real. Todos
saem de `messages/{pt,en,es}.json` — não é preciso mexer em componente.

| Onde | Chave | O que falta |
|---|---|---|
| Origem | `origem.desc` | "Três a quatro linhas sobre as famílias produtoras…" |
| Origem | `origem.etapas.*.desc` | "Uma linha descrevendo a etapa do processo." |
| Origem | `origem.fotoLegenda` | O bloco listrado espera a foto da produção familiar |
| Depoimentos | `depoimentos.*` | Citação, nome e papel dos três parceiros |

`historia-do-fundador.md`, neste mesmo diretório, tem material real que serve
para a seção Origem quando for a hora.

**Um desvio deliberado do design:** onde o artboard pedia `[ MAPA ou FOTO ]`
no contato, entrou a reportagem do Sergipe Rural (`video-reportagem.tsx`), a
pedido do dono. Ela carrega como *facade* — poster de 43 KB e nenhuma
requisição ao YouTube até o clique — e começa em 7:04, que é onde a matéria
sobre a Açaí Raiz aparece dentro do programa.

**Um erro do design foi mantido de propósito:** os eyebrows numerados vão
`03 · linha completa`, `03 · origem`, `04 · depoimentos`, `05 · instagram`,
`06 · contato` — dois `03`. Está assim no artboard. Corrigir é trocar
`origem.eyebrow` nos três dicionários.
