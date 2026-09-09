# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Atenção: o repo tem dois sites

| Onde | O quê | Status |
|---|---|---|
| raiz (este arquivo) | `index.html` estático, `en/`, `es/`, `tools/build-i18n.py` | **É o que está no ar** em www.acairaiz.com |
| `web/` | Reconstrução em Next 16 + Tailwind + shadcn/ui + next-intl | Em construção, só na URL `.vercel.app` |

O resto deste arquivo descreve **o site da raiz**. Para mexer na reconstrução,
leia `web/CLAUDE.md` — a stack, o i18n e as convenções são outras.

Como decidir: correção urgente de conteúdo que precisa ir ao ar hoje é aqui na
raiz. Qualquer coisa do redesign é em `web/`. Enquanto o DNS não mudar, editar
só `web/` não muda nada em www.acairaiz.com.

## Visão geral

Site institucional/vitrine da **Açaí Raiz**, produtora de polpa de açaí e cafés do grão de açaí em Sergipe. Site estático puro (HTML/CSS/JS), sem build, sem dependências, sem framework. Todo o conteúdo é em pt-BR e os identificadores no código também são em português (`produtos`, `carrinho`, `compras`, `depoimentos`).

Não há checkout próprio: o "carrinho" monta uma mensagem de texto e abre o WhatsApp da loja. Toda conversão termina no WhatsApp ou no Instagram.

## Comandos

Não há lint, test runner nem `package.json`. Nada a instalar — o build usa só a stdlib do Python.

```bash
# Regera en/ e es/ a partir do index.html. RODAR SEMPRE que mexer em texto.
python3 tools/build-i18n.py

# Preview local (necessário para o legado em js/, que usa ES modules e quebra em file://)
python3 -m http.server 8000    # http://localhost:8000

# Deploy: GitHub Pages serve a branch main na raiz do repo
git push origin main            # publica em www.acairaiz.com (ver CNAME)
```

Não há ambiente de staging — **push na `main` é deploy em produção.**

## i18n: o site tem 3 idiomas gerados de uma fonte só

`index.html` é ao mesmo tempo **a fonte e o site em português** — é o único HTML editado à mão. `tools/build-i18n.py` lê ele mais `i18n/en.json` e `i18n/es.json` e escreve `en/index.html` e `es/index.html`. O script **nunca escreve no `index.html`**.

**Editar `en/index.html` ou `es/index.html` à mão não adianta — o próximo build sobrescreve.** Ambos começam com um comentário avisando disso.

Como marcar texto traduzível:

```html
<h1 data-i18n="hero.title">O café feito do<br /><em>grão do açaí</em></h1>
```

O valor no dicionário é **HTML, não texto puro**, então `<br>` e `<em>` vêm da própria tradução. Para atributos existe `data-i18n-alt` e `data-i18n-aria-label`. Toda string nova em PT precisa da chave nos dois JSON, senão o build falha com a lista do que falta (de propósito — chave silenciosamente ausente vira página meio traduzida em produção).

Decisões embutidas no arranjo:

- **Nome de produto não traduz** ("Café do grão de açaí" está impresso na embalagem). Só a descrição.
- **A mensagem do pedido no WhatsApp é sempre em português**, em qualquer idioma do site — quem lê é a atendente. Só o alerta de carrinho vazio é traduzido, via o objeto `I18N` que o build injeta entre os marcadores `/* I18N:JS */`.
- Os marcadores `<!-- I18N:HREFLANG -->` e `/* I18N:JS */` são **pareados** e devem sobreviver no `index.html`: é o que torna o build idempotente. Apagar um quebra o script.
- `.prettierignore` exclui `en/` e `es/` para o Prettier não reformatar arquivo gerado.

## Arquitetura: duas gerações de site convivendo

Esta é a coisa mais importante a entender antes de editar qualquer arquivo.

### Geração atual — `index.html` (é só esse arquivo)

Página única autossuficiente, ~1770 linhas, sem nenhuma referência a `css/` ou `js/`:

| Faixa | Conteúdo |
|---|---|
| ~11–1330 | Todo o CSS, inline em `<style>`. Design tokens em `:root` (`--acai`, `--cream`, `--gold`). Breakpoints em 768px, 900px, 540px |
| 1333–1693 | Markup: nav, hero, produtos, depoimentos, instagram, contato, footer, painel do carrinho |
| 1695–1770 | Todo o JS, inline em `<script>`. Sem módulos, sem imports — funções globais chamadas via `onclick` no HTML |

O único outro arquivo que ela consome é `imgs/` (logo + 5 fotos do Instagram). A imagem do hero está **embutida como base64** na linha 1360, o que sozinho responde por 340 KB dos 395 KB do arquivo.

### Geração legada — não referenciada por nada

`css/`, `js/`, `json/produtos.json` e `missao.html` são da versão anterior do site e **estão mortos**: nenhuma página os carrega. O commit `cc0fd1b "new website"` substituiu tudo por `index.html` sem remover o antigo.

- `js/script.js` era o entry point, importando 5 módulos ES (`carrinho-compras`, `modal-saibamais`, `scroll-animacao`, `scroll-suave`, `horario-funcionamenot` — o typo está no nome do arquivo)
- `json/produtos.json` tinha os produtos como dados; a versão atual regrediu para produtos hardcoded no HTML
- `missao.html` é órfã (nada linka pra ela), mas **contém conteúdo aproveitável**: a história do fundador — Belém do Pará, primeiro plantio comercial de açaí em Sergipe em 2013 com sementes da EMBRAPA-PA, primeira frutificação em 2017. O site atual não tem seção "sobre"

Ao mexer no site, confirme que está editando `index.html`. Editar `css/geral.css` ou `js/modules/*` não tem efeito nenhum em produção.

## Armadilhas conhecidas

**Preço de produto vive em 3 lugares independentes.** Para cada produto, o preço aparece no card (`.produto-preco`), no item do carrinho (`.cart-item-size`) e como argumento de `changeQty(this, ±1, preco)`. O terceiro **já está divergente** (passa `25` onde o texto diz `R$ 27,00`) e passa despercebido porque a função ignora esse parâmetro: `updateTotal()` calcula o total fazendo **regex no texto renderizado** do `.cart-item-size`. Ao mudar qualquer preço, mude os três — ou, melhor, unifique numa fonte de dados só.

**Nunca adicione imagem sem otimizar antes.** As fotos em `imgs/` são JPEGs originais de câmera de celular: `instagram-2.jpg` tem 8,9 MB em 3072×4080 e é exibida num quadrado de ~200px. O repo tem 59 MB e a página pesa ~25 MB por causa disso.

**`id="logo"` está duplicado** (nav e footer) — HTML inválido; `getElementById` só enxerga o primeiro.

**Fotos de produto existem mas não são usadas.** `imgs/acai-produto.png`, `cafe-de-acai-produto.png`, `blend-produto.png` e `licor-png.png` estão no repo; os cards de produto usam emoji (🫐 ☕ ✨) no lugar.

**Sem `.gitignore`** — `.DS_Store` está versionado.

## Backlog

`critical-workflow.md` tem o diagnóstico completo do site (performance, SEO, acessibilidade, conversão) priorizado por impacto. Consulte antes de propor melhorias, para não sugerir o que já está mapeado.
