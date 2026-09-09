import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";

import { Eyebrow, Faixa } from "@/components/eyebrow";
import { TAGS } from "@/i18n/rich";

import { CenaHero } from "./cena-hero";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[radial-gradient(115%_95%_at_82%_34%,oklch(0.92_0.05_108)_0%,oklch(0.945_0.032_95)_38%,oklch(0.965_0.02_85)_66%,oklch(0.965_0.02_85)_100%)] pt-16 pb-16 lg:pt-32.5 lg:pb-7.5"
    >
      <Faixa className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-6 ">
          <Eyebrow className="text-xs tracking-[0.16em] ">
            {t("eyebrow")}
          </Eyebrow>

          <h1 className="m-0 font-display text-[44px] leading-[0.99] tracking-[-0.01em] text-balance text-tinta sm:text-[58px] lg:text-[78px] lg:w-[600] z-4">
            {t.rich("titulo", TAGS)}
          </h1>

          <p className="m-0 max-w-[460] text-lg leading-[1.55] text-tinta-suave lg:text-xl ">
            {t.rich("sub", TAGS)}
          </p>

          <div className="mt-1 flex flex-wrap gap-3 ">
            <a
              href="#contato"
              className="rounded-full bg-folha px-7 py-4 text-[15px] font-bold text-white transition-opacity hover:opacity-90"
            >
              {t("ctaPrimario")}
            </a>
            <a
              href="#produto"
              className="rounded-full border border-[oklch(0.78_0.03_60)] px-7 py-4 text-[15px] font-semibold text-tinta-suave transition-colors hover:border-tinta hover:text-tinta"
            >
              {t("ctaSecundario")}
            </a>
          </div>

          <p className="mt-1.5 flex items-center gap-2.5 text-[16px] text-tinta-suave">
            <Globe
              className="size-[18px] text-[oklch(0.45_0.11_130)]"
              strokeWidth={1.7}
            />
            {t("entregas")}
          </p>
        </div>

        <CenaHero />
      </Faixa>
    </section>
  );
}
