# Critical Workflow — Açaí Raiz

Diagnóstico do site em `index.html`, priorizado por impacto. Levantado em 12/08/2026.

Referências de linha apontam para `index.html` no estado do commit `6b388d0` e podem sair de lugar conforme o arquivo for editado.

**Se for atacar só três coisas:** P1 (imagens), P2 (fotos de produto) e P3 (meta tags). Elas concentram quase todo o ganho e são as mais baratas.

---

## P1 — Peso da página: ~25 MB 🔴

O problema mais grave do site. As 5 fotos do Instagram (linhas 1518–1538) são JPEGs originais de câmera, exibidos num grid de ~200px:

| arquivo | tamanho | dimensões |
|---|---|---|
| `instagram-2.jpg` | 8,9 MB | 3072×4080 |
| `instagram-4.jpg` | 5,4 MB | 3072×4080 |
| `instagram-3.jpg` | 5,3 MB | 4032×3024 |
| `instagram-1.jpg` | 4,2 MB | 3072×3433 |
| `instagram-5.jpg` | 0,6 MB | 750×949 |

Somam **24,4 MB**. No 4G isso é cerca de um minuto de carregamento — a maioria dos visitantes fecha a aba antes de ver qualquer coisa.

Somando o resto:
- **Hero em base64** (linha 1360): 340 KB colados dentro do HTML. Infla o arquivo de ~50 KB para 395 KB, bloqueia o first paint e impede o navegador de cachear a imagem separadamente do HTML.
- **`logo.png`**: 423 KB em 1000×1000, exibido em ~50px.

### Ações

- [ ] Redimensionar as 5 fotos do Instagram para 600px no lado maior e converter para WebP
- [ ] Extrair o hero base64 para arquivo `.webp`, referenciar por URL e marcar com `fetchpriority="high"` (ou `<link rel="preload">`)
- [ ] Regerar o logo em ~200px, ou substituir por SVG
- [ ] Adicionar `loading="lazy"` em tudo abaixo da dobra (Instagram, fotos de produto) — **menos** no hero
- [ ] Adicionar `width` e `height` explícitos em todas as `<img>` para eliminar layout shift
- [ ] Apagar os originais gigantes do repo (hoje são 59 MB de histórico)

```bash
# Redimensionar + converter (cwebp: brew install webp)
for f in imgs/instagram-*.jpg; do
  cwebp -q 80 -resize 600 0 "$f" -o "${f%.jpg}.webp"
done
```

**Meta: 25 MB → ~400 KB.**

---

## P2 — Produtos sem foto de produto ✅ feito em 13/08/2026

Os cards passaram a ter área de imagem real (`.produto-img`), com crop no rótulo — o rótulo é a única diferença entre os produtos, então ele virou o herói do card. Mesma imagem em miniatura nos itens do carrinho.

Junto veio uma decisão de negócio: **a polpa de açaí saiu do site** e o catálogo virou só a linha de café (3 produtos, todos 250g / R$ 27,00). Hero, subtítulo da seção e rodapé foram reescritos em cima de "o café feito do grão do açaí".

Pipeline usado: `sips` para crop e resize → JPEG q50 a 600px. **Não há WebP nesta máquina** — nem via `sips`, nem via ImageIO/Swift. Por isso `cafe-grao.jpg` ficou em 53 KB em vez dos < 40 KB planejados; a textura granulada do kraft é cara em JPEG. Se instalarem `cwebp` (`brew install webp`), dá pra cair para ~20 KB.

Os 3 rótulos chegaram e estão no ar (`imgs/produtos/`, ~55 KB cada, 600×712). Os recortes foram gerados por detecção automática, não no olho: um script Swift acha o papel kraft por cor, localiza a faixa do rótulo por densidade de tinta por linha e centraliza o crop nela. Por isso os três saem na mesma escala mesmo vindo de arquivos com enquadramento e resolução diferentes (um deles era 3072×4608). O script está versionado em `tools/crop-rotulo.swift`, com o passo a passo no `tools/README.md` — reutilizar se entrar mais produto na linha.

**Divergência de nome a decidir:** os rótulos dizem `BLEND CACAU E AÇAÍ` e `BLEND CAFÉ DE AÇAÍ`, o site diz `Blend cacau` e `Blend Café Açaí`. Alinhar com a embalagem exigiria mexer em card, carrinho, rodapé e mensagem do WhatsApp.

---

## P3 — Compartilhar o link não gera preview 🔴

O `<head>` (linhas 4–10) tem só `charset`, `viewport`, `title` e a fonte. Como o negócio vende por WhatsApp e Instagram, o link colado numa conversa aparece cru — sem imagem, sem descrição. Perde muito clique.

- [ ] `<meta name="description">` com a proposta de valor
- [ ] Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) — é o que o WhatsApp lê
- [ ] Twitter Card (`summary_large_image`)
- [ ] `<link rel="icon" href="imgs/favicon.ico">` — **o arquivo já existe no repo mas nunca é referenciado**
- [ ] Title mais descritivo: `Açaí Raiz` → `Açaí Raiz | Polpa de açaí pura e café do grão — Sergipe`
- [ ] JSON-LD `LocalBusiness` + `Product` (habilita preço e avaliações no resultado do Google)
- [x] ~~`<link rel="canonical">`, `robots.txt`, `sitemap.xml`~~ — entraram junto com o i18n (P3.6), com `hreflang` para os 3 idiomas
- [ ] `preconnect` para `fonts.googleapis.com` e `fonts.gstatic.com`
- [ ] Instalar analytics — hoje não há como saber se alguém compra

---

## P3.5 — Vídeo da reportagem ✅ feito em 13/08/2026

O placeholder de mapa (que era só um emoji 🗺️) virou a reportagem do **Sergipe Rural** sobre a produção, via YouTube (`a8TZoOlsLAQ`).

Não é um iframe cru: é uma **fachada**. O que aparece é o poster (43 KB, frame do torrador extraído do vídeo) com botão de play; o iframe do YouTube só é criado no clique. Um embed comum baixaria ~1 MB de script do Google só para existir, e faria requisição a terceiro em toda visita — inclusive de quem nunca assiste. Usa `youtube-nocookie.com`, e a legenda tem link direto para o YouTube como fallback se o JS falhar.

Chegou a existir uma versão self-hosted com o MP4 de 45 MB. Foi descartada antes de qualquer commit — **o arquivo nunca entrou no histórico do git**, então não há peso a limpar.

- [ ] **Direitos**: a reportagem é conteúdo da emissora. Agora quem hospeda é o YouTube, não a Açaí Raiz — o risco caiu, mas fica o registro
- [ ] A `.gitattributes` ganhou `*.mp4/*.jpg/*.png binary` para proteger binários do `* text=auto`. Vale manter mesmo sem o MP4

## P3.6 — Site em 3 idiomas ✅ feito em 13/08/2026

PT (padrão), EN e ES em `/`, `/en/` e `/es/` — arquivos HTML reais, indexáveis, gerados de fonte única por `tools/build-i18n.py`. Detalhes de uso no `CLAUDE.md`.

Escolhas: manter 3 cópias de um HTML de 2.100 linhas foi descartado (cada ajuste de CSS viraria 3 edições e as cópias sairiam de sincronia); tradução só em JS foi descartada por não ser indexável. 65 chaves, ~384 palavras.

Entraram junto: `sitemap.xml` com `hreflang`, `robots.txt`, `canonical` por idioma, seletor PT·EN·ES no nav e faixa que **sugere** o idioma do navegador sem nunca redirecionar.

- [ ] **Revisar o claim de cafeína nas traduções.** `não contém cafeína` → `caffeine-free` / `sin cafeína` é claim de produto. Se houver intenção de vender fora do Brasil, precisa de revisão de quem entende do rótulo, não só de idioma
- [ ] **O passo de build é o ponto frágil**: editar `index.html` e esquecer de rodar o script deixa EN/ES desatualizados sem aviso. Um GitHub Action rodando o build no push resolveria
- [ ] Preços seguem em R$ nos 3 idiomas — conversão de moeda ficou fora de escopo
- [ ] `missao.html` não foi traduzido (página órfã do site antigo)

## P4 — Informação que o cliente procura e não acha 🟡

- [ ] **Entrega**: "Sergipe, Brasil" (linha 1581) é vago demais. Qual cidade? Entrega em quais bairros? Frete quanto? Prazo? São as três primeiras perguntas de quem compra comida online
- [ ] **Pagamento**: aceita Pix? Cartão? Não aparece em lugar nenhum
- [ ] **Mapa** (linha 1585) é um emoji 🗺️ de placeholder — colocar embed do Google Maps ou remover
- [ ] **Botão flutuante de WhatsApp** — padrão no varejo brasileiro, converte bem, o site não tem
- [ ] **Seção "Quem somos"** — `missao.html` está órfã e contém a história do fundador: Belém do Pará, primeiro plantio comercial de açaí em Sergipe em 2013 com sementes da EMBRAPA-PA, primeira frutificação em 2017. É exatamente a história que justifica o nome "Raiz" e o posicionamento de produto puro. Trazer para a home ou linkar a página
- [ ] **`© 2024`** no rodapé (linha 1622) está desatualizado
- [ ] **Conferir o e-mail**: `acairaiaz20@gmail.com` (linha 1571) — "rai**a**z", enquanto o Instagram é `acairai**z**20`. Pode ser typo derrubando contato
- [x] ~~**Verificar se os depoimentos são reais**~~ — a seção foi **comentada** em 13/08/2026: os 4 depoimentos falavam de polpa/açaí, nenhum de café, e a polpa saiu do catálogo. Reativar só com depoimento real de cliente do café (print de WhatsApp/Instagram serve). Não inventar
- [ ] Dois links diferentes para o mesmo WhatsApp (`wa.link/uox1eq` e `wa.me/5579991198907`) — unificar

---

## P5 — Carrinho: preço em 3 lugares, já divergindo 🟡

Cada preço vive em três lugares independentes: o card (`.produto-preco`), o item do carrinho (`.cart-item-size`) e o argumento de `changeQty(this, ±1, preco)`. **O terceiro já está divergente** — passa `25` onde o texto diz `R$ 27,00`.

Hoje não quebra nada porque `changeQty` ignora o parâmetro e `updateTotal()` (linha ~1741) calcula o total fazendo **regex no texto renderizado da tela**. É uma armadilha esperando o próximo refactor.

- [x] ~~Calcular o total a partir dos dados, não de regex em texto de UI~~ — cada `.cart-item` agora tem `data-preco`, lido por `precoDe()`. A divergência 25/27 sumiu junto
- [x] ~~Remover o parâmetro `preco` não usado de `changeQty`~~
- [ ] Os produtos continuam hardcoded no HTML — de propósito, para não perder o conteúdo indexável (ver P3). Se virar array em JS, renderizar no servidor ou manter fallback no HTML
- [ ] Persistir o carrinho em `localStorage` (hoje esvazia ao recarregar)
- [ ] Pedir nome e endereço antes de enviar — a mensagem atual só leva os itens, e a atendente tem que perguntar tudo na mão
- [ ] Trocar o `alert('Adicione pelo menos um produto!')` por feedback inline

---

## P6 — Acessibilidade 🟡

- [ ] `id="logo"` duplicado no nav (1338) e no footer (1594) — HTML inválido
- [ ] O menu hambúrguer (linha 1347) é uma `<div>`: sem `role="button"`, sem `aria-expanded`, sem acesso por teclado
- [ ] Botões `+` e `✕` sem `aria-label` — um leitor de tela anuncia só "mais"
- [ ] O painel do carrinho não fecha com `Esc` e não prende o foco (sem focus trap)
- [ ] `alt="Instagram 1"` … `alt="Instagram 5"` não descrevem nada
- [ ] Emojis decorativos sem `aria-hidden="true"`
- [ ] Conferir contraste do texto dourado (`--gold: #c9a84c`) sobre fundo claro em AA

---

## P7 — Limpeza do repositório 🟢

Nada disso é carregado pelo `index.html` atual:

- [ ] `css/` — 6 arquivos, incluindo `geral.css` com 579 linhas
- [ ] `js/` — entry point + 5 módulos ES
- [ ] `json/produtos.json` — **avaliar reaproveitar em P5 antes de apagar**
- [ ] `missao.html` — **extrair o conteúdo em P4 antes de apagar**
- [ ] Criar `.gitignore` e remover o `.DS_Store` versionado
- [ ] Considerar extrair o CSS inline (~1320 linhas) para arquivo próprio, que passa a ser cacheado entre visitas

---

## Nota de processo

Não existe staging: **push na `main` publica direto em produção**. Verificar as mudanças em `python3 -m http.server 8000` antes de subir.
