import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";

import { Cabecalho } from "@/components/secoes/cabecalho";
import { Contato } from "@/components/secoes/contato";
import { Depoimentos } from "@/components/secoes/depoimentos";
import { Essencia } from "@/components/secoes/essencia";
import { Hero } from "@/components/secoes/hero";
import { InstagramSecao } from "@/components/secoes/instagram";
import { Numeros } from "@/components/secoes/numeros";
import { Origem } from "@/components/secoes/origem";
import { Produtos } from "@/components/secoes/produtos";
import { Rodape } from "@/components/secoes/rodape";
import { routing } from "@/i18n/routing";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <>
      <Cabecalho locale={locale} />
      <main className="flex flex-col">
        <Hero />
        <Numeros />
        <Essencia />
        <Produtos />
        <Origem />
        <Depoimentos />
        <InstagramSecao />
        <Contato />
      </main>
      <Rodape />
    </>
  );
}
