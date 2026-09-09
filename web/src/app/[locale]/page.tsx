import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { TAGS } from "@/i18n/rich";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { PRODUTOS, brl } from "@/lib/produtos";
import { SITE, whatsappUrl } from "@/lib/site";

/**
 * Página provisória. Existe só para provar que a fundação está de pé:
 * traduções, tokens da marca, componentes do shadcn, troca de idioma e os
 * produtos vindo de lib/produtos.ts. O design real substitui tudo isto.
 */
export default async function Home() {
  const t = await getTranslations();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-medium tracking-wide text-gold uppercase">
          {t("hero.badge")}
        </p>
        {/* Traduções trazem markup (<br>, <em>, <a>): sempre t.rich com um
            callback por tag — nunca dangerouslySetInnerHTML. */}
        <h1 className="text-4xl font-semibold text-balance text-acai">
          {t.rich("hero.title", TAGS)}
        </h1>
        <p className="text-ink-soft">{t("hero.desc")}</p>
      </header>

      <nav aria-label={t("lang.aria")} className="flex gap-3">
        {routing.locales.map((cod) => (
          <Link
            key={cod}
            href="/"
            locale={cod}
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
          >
            {cod.toUpperCase()}
          </Link>
        ))}
      </nav>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-acai">{t("prod.label")}</h2>
        <ul className="flex flex-col gap-3">
          {PRODUTOS.map((produto) => (
            <li
              key={produto.id}
              className="flex items-baseline justify-between gap-4 rounded-lg bg-card p-4"
            >
              <div>
                {/* nome nunca traduz: é o que está impresso na embalagem */}
                <strong className="text-ink">{produto.nome}</strong>
                <p className="text-sm text-ink-soft">
                  {t(`produtos.${produto.id}.desc`)}
                </p>
              </div>
              <span className="shrink-0 font-semibold text-acai">
                {brl(produto.preco)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <Button asChild size="lg" className="self-start">
        <a href={whatsappUrl()} target="_blank" rel="noopener">
          {t("nav.cta")}
        </a>
      </Button>

      <footer className="text-sm text-ink-soft">
        {t("foot.love")} · @{SITE.instagram}
      </footer>
    </main>
  );
}
