@AGENTS.md

# CLAUDE.md — projeto Next (`web/`)

Site novo da **Açaí Raiz**, em construção. Next 16 (App Router, Turbopack),
React 19, TypeScript, Tailwind v4, shadcn/ui, next-intl. Conteúdo em pt-BR e
identificadores em português (`produtos`, `carrinho`, `pedido`).

## O repo tem dois sites — confira em qual você está mexendo

| Onde | O quê | Status |
|---|---|---|
| `..` (raiz do repo) | `index.html` de 404 KB, CSS e JS inline, `en/` e `es/` gerados por `python3 tools/build-i18n.py` | **É o que está no ar** em www.acairaiz.com |
| `web/` (aqui) | Este projeto | Em construção, só na URL `.vercel.app` |

Nada em `web/` importa de `..`. Enquanto o Next não for lançado, **correção
urgente de conteúdo vai no `index.html` da raiz**, não aqui — o `../CLAUDE.md`
explica aquele projeto.

## Comandos

```bash
npm run dev      # http://localhost:3000
npm run build
npm run lint
npx shadcn@latest add <componente>
```

## Deploy

Vercel, com **Root Directory = `web`**. O domínio real continua no GitHub Pages
servindo o site antigo. **Não mexer no DNS nem no `../CNAME` até o usuário
mandar** — trocar o DNS é o que tira o site atual do ar.

## i18n

Três idiomas: `pt` (padrão), `en`, `es`. Configuração em `src/i18n/`:

- `routing.ts` — `localePrefix: "as-needed"`. PT mora na raiz (`/`), EN em
  `/en`, ES em `/es`. Isso **preserva as URLs já indexadas** do site atual e o
  `../sitemap.xml`; trocar para `"always"` mandaria o PT para `/pt` e quebraria
  todo link externo.
- `request.ts` — o locale vem de **`next/root-params`**, não do `requestLocale`
  do next-intl, que está deprecado desde o Next 16. O `timeZone` é fixo em
  `America/Maceio`: sem isso servidor e navegador formatam data diferente.
- `navigation.ts` — **navegue sempre pelo `Link`/`redirect` daqui**, nunca por
  `next/link` ou `next/navigation`: são eles que levam o locale para a URL.
- `src/proxy.ts` — no Next 16 o antigo `middleware.ts` chama-se `proxy.ts`.
  Mesma função: negocia o idioma e reescreve para o segmento `[locale]`.
- `src/global.d.ts` — declara `Messages` a partir de `messages/pt.json`, então
  `t("hero.titl")` é erro de compilação, não string faltando em produção.
  **Chave nova entra nos três arquivos** ou o TypeScript reclama.

### Traduções carregam marcação, e a sintaxe é ICU (não HTML)

Quebra de linha e ênfase mudam de lugar em cada idioma, então elas vivem dentro
da string. Duas regras que o site antigo não tinha:

1. **Não existe tag autofechada.** É `<br></br>`, nunca `<br />` — o next-intl
   escapa a segunda e o visitante lê `&lt;br/&gt;` na tela.
2. **Tag não leva atributo.** O `href` fica no código, não no JSON: a mensagem
   diz `<link>Ver no YouTube</link>` e o componente resolve com
   `linkExterno(SITE.reportagemUrl, chunks)`.

Use `t.rich(chave, TAGS)` com os callbacks de `src/i18n/rich.tsx`. Nunca
`dangerouslySetInnerHTML`.

### Duas regras de conteúdo herdadas do site antigo

- **Nome de produto não traduz.** "Café do grão de açaí" é o que está impresso
  na embalagem. Só a descrição é traduzida.
- **A mensagem do pedido no WhatsApp é sempre em português**, em qualquer
  idioma do site — quem lê do outro lado é a atendente, não o visitante. Só a
  interface do carrinho é traduzida.

## Produto: preço mora em um lugar só

`src/lib/produtos.ts` é a fonte única. No site antigo o preço aparecia no card,
no item do carrinho e num argumento de `changeQty()` — e o terceiro já tinha
divergido em silêncio, porque a função ignorava o parâmetro e o total saía de
uma regex sobre o texto renderizado. **Não repita isso.**

- Preço, peso, imagem e o `nome` (não traduzido): `lib/produtos.ts`.
- Descrição e textos de acessibilidade: `messages/*.json`, em
  `produtos.<id>` — os ids do array são as chaves do dicionário.
- Total e mensagem do pedido: `lib/whatsapp.ts`, a partir do array. Nunca
  calcule preço lendo o DOM.
- Contatos (WhatsApp `5579991198907`, Instagram `@acairaiz20`, e-mail — que
  tem mesmo o "ai" trocado, não "corrija"): `lib/site.ts`.

## Estilo

- Paleta da marca no `@theme` de `src/app/globals.css`: `--color-acai`,
  `--color-cream`, `--color-gold`, `--color-berry`, `--color-ink`… Vira
  utilitário (`bg-acai`, `text-gold`). **Nunca escreva hex num componente.**
- Os tokens semânticos do shadcn (`--primary`, `--background`, `--accent`…)
  já apontam para a marca, então componente novo do shadcn nasce na paleta
  certa.
- Não há modo escuro: nada adiciona a classe `.dark`. O bloco fica no CSS
  porque os componentes trazem variantes `dark:`.
- Componentes do shadcn com Radix (`components.json`, estilo `radix-nova`).
  O carrinho deve virar um `Sheet`.

## Imagens

**Toda imagem passa por `next/image`, e nada entra em `public/` sem ser
redimensionado antes.** As fotos em `../imgs/` são JPEGs originais de câmera de
celular: `instagram-2.jpg` tem 8,9 MB em 3072×4080 e era exibida num quadrado
de 200px. São elas que fazem o repo ter 62 MB e a página antiga pesar ~25 MB.
Ao trazer uma foto para cá: lado maior ≤ 2000px.

## Conteúdo que o site atual tem e não usa

- `../missao.html` é uma página órfã com **a história do fundador**: Belém do
  Pará, primeiro plantio comercial de açaí em Sergipe em 2013 com sementes da
  EMBRAPA-PA, primeira frutificação em 2017. O site atual não tem seção
  "sobre"; o design novo provavelmente vai ter.
- `../critical-workflow.md` é o diagnóstico do site priorizado por impacto
  (performance, SEO, acessibilidade, conversão). **Leia antes de propor
  melhoria** para não sugerir o que já está mapeado.

## Detalhes que surpreendem

- `<Link locale="pt" href="/">` renderiza `href="/pt"`, que responde 307 para
  `/`. É proposital do next-intl (garante o cookie de idioma). O `hreflang` do
  `alternates`, esse sim, aponta para `/` — é o que o Google lê.
- O `[locale]` funciona como catch-all: `/qualquer-coisa` chega ao
  `request.ts`. Por isso o `hasLocale` com fallback para o `defaultLocale`.
- `src/app/[locale]/page.tsx` é **provisória** — existe só para provar que
  traduções, tokens, shadcn e produtos estão de pé. O design real substitui.
