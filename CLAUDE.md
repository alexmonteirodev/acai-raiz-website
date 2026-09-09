@AGENTS.md

# CLAUDE.md

Site da **Açaí Raiz**, produtora de café e blends feitos do caroço do açaí, em
Sergipe. Next 16 (App Router, Turbopack), React 19, TypeScript, Tailwind v4,
shadcn/ui e next-intl. Conteúdo em pt-BR e identificadores em português.

**O site é B2B: capta revendedores.** A conversão é "Seja parceiro" / falar no
WhatsApp. **Não existe carrinho nem preço** — o site antigo tinha os dois, o
design novo não, e foi uma decisão explícita do dono. Se for reintroduzir
preço, pergunte antes.

## Comandos

```bash
npm run dev      # http://localhost:3000
npm run build
npm run lint
npx shadcn@latest add <componente>
```

## Deploy

Vercel. **O domínio www.acairaiz.com ainda não aponta para cá** — apontar o DNS
é o passo de lançamento, e só o usuário decide quando.

O `CNAME` na raiz é resquício do GitHub Pages, que servia o site antigo.
Continua versionado de propósito: apagá-lo desvincula o domínio nas
configurações do GitHub. Não atrapalha a Vercel.

## Design

`docs/design.md` diz de onde veio o design, o que ele definiu, o que foi
adaptado para mobile e **o inventário do que ainda é texto placeholder**.
Leia antes de mexer em layout ou de escrever conteúdo.

## i18n

Três idiomas: `pt` (padrão), `en`, `es`. Configuração em `src/i18n/`:

- `routing.ts` — `localePrefix: "as-needed"`. PT na raiz (`/`), EN em `/en`, ES
  em `/es`, preservando as URLs que o site antigo já tinha indexadas. Aqui
  moram também `HTML_LANG` e `caminhoDoLocale`, usados pelo layout e pelo
  `sitemap.ts` — não duplique nenhum dos dois.
- `request.ts` — o locale vem de **`next/root-params`**, não do `requestLocale`
  do next-intl, deprecado desde o Next 16. `timeZone` fixo em `America/Maceio`.
- `navigation.ts` — **navegue sempre pelo `Link`/`redirect` daqui**, nunca por
  `next/link` ou `next/navigation`.
- `src/proxy.ts` — no Next 16 o antigo `middleware.ts` chama-se `proxy.ts`.
- `src/global.d.ts` — declara `Messages` a partir de `messages/pt.json`, então
  `t("hero.titl")` é erro de compilação. **Chave nova entra nos três arquivos.**

### Traduções carregam marcação, e a sintaxe é ICU (não HTML)

1. **Não existe tag autofechada.** É `<br></br>`, nunca `<br />` — o next-intl
   escapa a segunda e o visitante lê `&lt;br/&gt;` na tela.
2. **Tag não leva atributo.** O `href` fica no código: a mensagem diz
   `<link>texto</link>` e o componente resolve com `linkExterno(url, chunks)`.

Use `t.rich(chave, TAGS)` com os callbacks de `src/i18n/rich.tsx`. Nunca
`dangerouslySetInnerHTML`.

## Dado versus tradução

A regra que organiza o projeto inteiro: **número, id, ordem e nome próprio são
dado; todo o resto é tradução.**

- `src/lib/produtos.ts` — os três produtos: `id`, `n`, `tag`, `nome`. O **nome
  não traduz**, é o que está impresso na embalagem. A descrição vem de
  `produtos.itens.<id>.desc`.
- `src/lib/conteudo.ts` — números da seção "Nossos números", pilares da
  essência, etapas da origem, quadros do Instagram. Só valor e id; rótulo e
  título vêm das mensagens pelo mesmo id.
- `src/lib/site.ts` — WhatsApp `5579991198907`, Instagram `@acairaiz20`,
  e-mail (que tem mesmo o "ai" trocado — **não "corrija"**) e a reportagem do
  Sergipe Rural, que começa em 424s porque a matéria sobre a Açaí Raiz só
  aparece aos 7:04 do programa.

O motivo é concreto: no site antigo o preço vivia em três lugares
independentes e o terceiro já tinha divergido em silêncio. Um id em um lugar
só evita a classe inteira desse bug.

## Estilo

- Paleta no `@theme` de `src/app/globals.css`, em oklch, direto do design:
  `creme`, `creme-claro`, `areia` (fundos claros); `casca`, `casca-escura`,
  `noite` (fundos escuros); `tinta`, `tinta-suave`, `tinta-clara` (texto);
  `folha` (verde dos CTAs), `terra`, `broto`, `uva` (eyebrows); `borda`.
  **Nunca escreva uma cor direto num componente.**
- Fontes: `font-display` (Anton, títulos), `font-rotulo` (Archivo, rótulos
  fortes), `font-sans` (Instrument Sans, corpo), `font-mono` (JetBrains Mono,
  eyebrows).
- Os tokens semânticos do shadcn já apontam para a marca, então componente
  novo do shadcn nasce na paleta certa.
- Não há modo escuro: nada adiciona a classe `.dark`.
- O vídeo do contato é um *facade* (`video-reportagem.tsx`): até o clique é só
  o poster, e nenhum byte sai para o YouTube. Todo embed de terceiro que entrar
  no site deve seguir esse padrão.
- **Animação segue duas regras**, valendo para o paralaxe do hero
  (`cena-hero.tsx`) e a contagem dos números (`contador.tsx`): o HTML do
  servidor já traz o estado final, para que sem JS a página continue correta; e
  nada se move sob `prefers-reduced-motion: reduce`. Animação nova entra assim.
- `src/components/eyebrow.tsx` tem os dois primitivos repetidos em toda seção:
  `<Eyebrow>` (o rótulo em mono) e `<Faixa>` (a largura de 1280px).
- Uma seção por arquivo em `src/components/secoes/`, na ordem da página.

**Cuidado com token inexistente:** o Tailwind descarta a classe em silêncio, e
a página fica sem estilo naquele ponto sem nenhum erro. Depois de mexer em
cores, vale conferir que a classe saiu no CSS compilado.

## Imagens

**As imagens ficam em `src/assets/` e entram por import estático**, nunca por
caminho de string em `public/`:

```tsx
import xicara from "@/assets/hero-xicara.png";
<Image src={xicara} alt={...} priority />
```

Isso não é preferência de estilo — é o que faz a troca de imagem funcionar.
O ETag do otimizador de imagem do Next varia por caminho e por largura, **mas
não pelo conteúdo do arquivo**: com `src="/design/foo.png"`, trocar o arquivo
mantém a URL e o ETag, o navegador recebe `304 Not Modified` e continua
mostrando a foto velha — em dev e em produção. O import estático põe um hash
do conteúdo na URL (`hero-xicara.1tyjyc_yloqnp.png`), então conteúdo novo é
URL nova e o problema deixa de existir.

De quebra o import traz as dimensões, então dá para dispensar o `fill` e deixar
a caixa seguir a proporção da imagem — trocar por uma foto de outro formato não
exige mexer em código.

`fotos-originais/` é material bruto que **não é servido**: os JPEGs de câmera de
celular do site antigo (`instagram-2.jpg` tem 8,9 MB em 3072×4080 e era exibida
num quadrado de 200px) mais os originais em tamanho cheio das fotos do design.

**Nada entra em `src/assets/` sem ser redimensionado antes**: lado maior
≤ 2000px. Guarde o original em `fotos-originais/` se ele tiver valor.

## Onde mais olhar

- `docs/design.md` — o design e o que ainda é placeholder.
- `docs/historia-do-fundador.md` — a história em primeira pessoa (Belém do
  Pará, primeiro plantio comercial de açaí em Sergipe em 2013 com sementes da
  EMBRAPA-PA, frutificação em 2017). Material real para a seção Origem.
- `docs/critical-workflow.md` — diagnóstico do site antigo priorizado por
  impacto. Leia antes de propor melhoria de performance ou SEO.

## Detalhes que surpreendem

- `<Link locale="pt" href="/">` renderiza `href="/pt"`, que responde 307 para
  `/`. É proposital do next-intl (garante o cookie de idioma). O `hreflang` do
  `alternates` aponta para `/` — é o que o Google lê.
- O seletor de idioma mostra **PT · ES · EN**, ordem do design, que não é a de
  `routing.locales`. A ordem de exibição está no `cabecalho.tsx`.
- O `[locale]` funciona como catch-all: `/qualquer-coisa` chega ao
  `request.ts`. Por isso o `hasLocale` com fallback para o `defaultLocale`.
- `robots.ts` e `sitemap.ts` ficam em `src/app/`, fora do `[locale]`. O matcher
  do `proxy.ts` ignora caminhos com ponto, então os dois passam direto.
- **O site antigo foi removido.** Era HTML estático servido pelo GitHub Pages
  na raiz da `main`, e está no histórico do git (último commit com ele:
  `16df93d`) — inclusive `tools/build-i18n.py`, `index.html`, `en/` e `es/`.
