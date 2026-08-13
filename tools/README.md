# tools

## crop-rotulo.swift

Calcula o recorte no rótulo de uma foto de embalagem, para os cards de produto.

Feito porque as fotos chegam com enquadramento, fundo e resolução diferentes (fundo preto,
branco, vinhete escuro; 1024×1536 e 3072×4608), e recortar no olho fazia os três cards saírem
em escalas distintas.

Como funciona: acha o papel kraft por cor, localiza a faixa do rótulo pela **densidade de tinta
por linha** (bounding box simples não serve — pega as sombras das dobras do saco) e devolve o
offset de um recorte de tamanho fixo, centrado nessa faixa.

```bash
swift tools/crop-rotulo.swift <imagem> <largura> <altura>   # imprime "offsetY offsetX"

# uso real, gerando um card:
swift tools/crop-rotulo.swift foto.png 660 784               # -> ex.: 491 184
sips -c 784 660 --cropOffset 491 184 foto.png --out crop.png
sips --resampleWidth 600 crop.png --out r.png
sips -s format jpeg -s formatOptions 50 r.png --out imgs/produtos/novo.jpg
```

Se a foto for de resolução maior, multiplique offsets e tamanhos pelo fator antes do `sips -c`
(o Blend Café foi recortado do original em 3× para não perder nitidez).

**Nota:** esta máquina não encoda WebP — nem `sips`, nem ImageIO/Swift. Por isso JPEG q50.
Com `brew install webp`, `cwebp -q 78` derruba os ~55 KB para ~20 KB.
