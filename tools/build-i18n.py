#!/usr/bin/env python3
"""Gera en/index.html e es/index.html a partir do index.html (portugues).

    python3 tools/build-i18n.py

O index.html e ao mesmo tempo a fonte e o site em portugues: e o unico
arquivo que se edita a mao, e este script NUNCA escreve nele. Cada trecho
traduzivel carrega data-i18n="chave", e o valor no dicionario e HTML (nao
texto puro), o que resolve de graca os casos com marcacao interna como
<br> e <em>.

O script faz cirurgia sobre a string original em vez de reserializar o HTML.
Assim tudo que nao e traduzivel sai byte a byte identico ao original, e o
diff de cada build mostra so o que mudou de verdade.
"""

import json
import pathlib
import re
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
FONTE = RAIZ / "index.html"
DICIONARIOS = RAIZ / "i18n"
DOMINIO = "https://www.acairaiz.com"

# codigo -> subpasta, valor de <html lang>
IDIOMAS = {"pt": ("", "pt-br"), "en": ("en", "en"), "es": ("es", "es")}
GERADOS = ["en", "es"]

# tags sem fechamento: nao contam profundidade
VAZIAS = {"br", "img", "input", "source", "link", "meta", "hr", "area", "col"}

# strings que o JS mostra ao visitante. A mensagem do pedido NAO entra aqui:
# ela vai sempre em portugues, porque quem le e a atendente.
CHAVES_JS = ["js.carrinhoVazio"]


class ErroDeBuild(Exception):
    pass


def fim_do_conteudo(html, tag, apos_abertura):
    """Offset onde comeca a tag de fechamento de `tag`.

    Conta profundidade para nao parar num </tag> de uma tag igual aninhada.
    """
    profundidade = 1
    padrao = re.compile(rf"<(/?){re.escape(tag)}\b[^>]*?(/?)>", re.I)
    pos = apos_abertura
    while True:
        m = padrao.search(html, pos)
        if not m:
            linha = html[:apos_abertura].count("\n") + 1
            raise ErroDeBuild(f"<{tag}> na linha {linha} nunca e fechada")
        if m.group(1) == "/":
            profundidade -= 1
            if profundidade == 0:
                return m.start()
        elif not m.group(2) and tag.lower() not in VAZIAS:
            profundidade += 1
        pos = m.end()


def traduz_conteudo(html, dic, faltando):
    """Troca o conteudo interno de todo elemento com data-i18n."""
    partes, cursor = [], 0
    abertura = re.compile(r'<([a-zA-Z][\w-]*)\b[^>]*?\bdata-i18n="([^"]+)"[^>]*?>')
    for m in abertura.finditer(html):
        if m.start() < cursor:
            continue  # ja consumido dentro de um bloco anterior
        tag, chave = m.group(1), m.group(2)
        fim = fim_do_conteudo(html, tag, m.end())
        if chave not in dic:
            faltando.add(chave)
            continue
        partes.append(html[cursor : m.end()])
        partes.append(dic[chave])
        cursor = fim
    partes.append(html[cursor:])
    return "".join(partes)


def traduz_atributos(html, dic, faltando):
    """data-i18n-alt="chave" sobrescreve o alt="..." da mesma tag."""
    for attr in ("alt", "aria-label", "title"):
        padrao = re.compile(rf'<[^>]*?\bdata-i18n-{attr}="([^"]+)"[^>]*?>', re.S)

        def troca(m, attr=attr):
            tag, chave = m.group(0), m.group(1)
            if chave not in dic:
                faltando.add(chave)
                return tag
            valor = dic[chave].replace("&", "&amp;").replace('"', "&quot;")
            if re.search(rf'\s{attr}="', tag):
                return re.sub(rf'(\s{attr}=")[^"]*(")', rf"\g<1>{valor}\g<2>", tag, count=1)
            return tag[:-1].rstrip() + f' {attr}="{valor}">'

        html = padrao.sub(troca, html)
    return html


def ajusta_caminhos(html):
    """Assets viram ../ porque os gerados ficam sempre um nivel abaixo.

    Relativo de proposito, em vez de /imgs/: nao depende de o site estar
    servido na raiz do dominio.
    """
    return re.sub(r'((?:src|href|poster)=")(imgs/|json/|css/|js/)', r"\1../\2", html)


def substitui_bloco(html, marcador, novo):
    """Troca o miolo entre <!-- MARCA --> e <!-- /MARCA -->, mantendo os dois.

    Preservar os marcadores e o que torna o build idempotente.
    """
    for abre, fecha in ((f"<!-- {marcador} -->", f"<!-- /{marcador} -->"),
                        (f"/* {marcador} */", f"/* /{marcador} */")):
        i, j = html.find(abre), html.find(fecha)
        if i != -1 and j != -1:
            return html[: i + len(abre)] + novo + html[j:]
    raise ErroDeBuild(f"marcadores de {marcador} nao encontrados no index.html")


def bloco_head(cod):
    sub = IDIOMAS[cod][0]
    url = lambda s: f"{DOMINIO}/{s + '/' if s else ''}"
    linhas = [f'\n    <link rel="canonical" href="{url(sub)}" />']
    for outro, (osub, _) in IDIOMAS.items():
        rotulo = "pt-BR" if outro == "pt" else outro
        linhas.append(f'    <link rel="alternate" hreflang="{rotulo}" href="{url(osub)}" />')
    linhas.append(f'    <link rel="alternate" hreflang="x-default" href="{url("")}" />\n    ')
    return "\n".join(linhas)


def bloco_js(cod, dic, faltando):
    pares = {}
    for k in CHAVES_JS:
        if k not in dic:
            faltando.add(k)
        pares[k] = dic.get(k, "")
    corpo = json.dumps({"lang": cod, **pares}, ensure_ascii=False)
    return f"\n      const I18N = {corpo};\n      "


def ajusta_seletor(html, cod):
    """Reescreve href e aria-current do seletor conforme o nivel do arquivo.

    Opera sobre a tag <a> inteira em vez de assumir a ordem dos atributos:
    no index.html o href vem antes do data-lang, e uma regex que exigisse a
    ordem contraria falharia em silencio, deixando /en/ apontando para /en/en/.
    """
    prefixo = "" if cod == "pt" else "../"

    def troca(m):
        tag = m.group(0)
        outro = re.search(r'data-lang="([a-z]{2})"', tag).group(1)
        sub = IDIOMAS[outro][0]
        destino = (prefixo + (f"{sub}/" if sub else "")) or "./"
        tag = re.sub(r'(\shref=")[^"]*(")', rf"\g<1>{destino}\g<2>", tag, count=1)
        tag = re.sub(r'\s+aria-current="page"', "", tag)
        if outro == cod:
            tag = tag[:-1].rstrip() + ' aria-current="page">'
        return tag

    return re.sub(r'<a\b[^>]*\bdata-lang="[a-z]{2}"[^>]*>', troca, html)


def main():
    if not FONTE.exists():
        print(f"erro: {FONTE} nao encontrado", file=sys.stderr)
        return 1
    original = FONTE.read_text(encoding="utf-8")

    problemas, gravados = [], []
    for cod in GERADOS:
        arq = DICIONARIOS / f"{cod}.json"
        if not arq.exists():
            print(f"erro: dicionario ausente: {arq}", file=sys.stderr)
            return 1
        dic = json.loads(arq.read_text(encoding="utf-8"))
        faltando = set()

        html = traduz_conteudo(original, dic, faltando)
        html = traduz_atributos(html, dic, faltando)
        html = ajusta_caminhos(html)
        html = substitui_bloco(html, "I18N:HREFLANG", bloco_head(cod))
        html = substitui_bloco(html, "I18N:JS", bloco_js(cod, dic, faltando))
        html = ajusta_seletor(html, cod)
        html = re.sub(
            r'(<html\b[^>]*\blang=")[^"]*(")', rf"\g<1>{IDIOMAS[cod][1]}\g<2>", html, count=1
        )

        if faltando:
            problemas.append((cod, sorted(faltando)))
            continue

        aviso = (
            f"<!-- ARQUIVO GERADO por tools/build-i18n.py - nao edite a mao.\n"
            f"     Edite index.html e i18n/{cod}.json, depois rode o script. -->\n"
        )
        destino = RAIZ / IDIOMAS[cod][0] / "index.html"
        destino.parent.mkdir(exist_ok=True)
        destino.write_text(aviso + html, encoding="utf-8")
        gravados.append(destino.relative_to(RAIZ))

    # chaves no dicionario que ninguem usa mais
    usadas = set(re.findall(r'data-i18n(?:-[\w-]+)?="([^"]+)"', original)) | set(CHAVES_JS)
    for cod in GERADOS:
        arq = DICIONARIOS / f"{cod}.json"
        if arq.exists():
            orfas = sorted(set(json.loads(arq.read_text(encoding="utf-8"))) - usadas)
            if orfas:
                print(f"aviso: {cod}.json tem {len(orfas)} chave(s) sem uso: {', '.join(orfas)}")

    for d in gravados:
        print(f"  gerado: {d}")

    if problemas:
        print("\nfalta traducao - nada gravado para esses idiomas:", file=sys.stderr)
        for cod, chaves in problemas:
            print(f"  {cod}: {len(chaves)} chave(s)", file=sys.stderr)
            for c in chaves:
                print(f"    - {c}", file=sys.stderr)
        return 1
    print(f"\nok: {len(gravados)} arquivo(s), {len(usadas)} chave(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
