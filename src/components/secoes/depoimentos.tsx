import { useTranslations } from "next-intl";

import { Eyebrow, Faixa } from "@/components/eyebrow";
import { DEPOIMENTOS } from "@/lib/conteudo";

export function Depoimentos() {
  const t = useTranslations("depoimentos");

  return (
    <section className="py-16 lg:py-24">
      <Faixa className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-3.5">
            <Eyebrow className="text-uva">{t("eyebrow")}</Eyebrow>
            <h2 className="m-0 font-display text-[36px] leading-[1.02] tracking-[-0.03em] lg:text-[44px]">
              {t("titulo")}
            </h2>
          </div>
        </div>

        <ul className="grid gap-4 md:grid-cols-3">
          {DEPOIMENTOS.map((id) => (
            <li
              key={id}
              className="flex flex-col justify-between gap-6 rounded-[18px] border border-borda bg-creme-claro p-7"
            >
              <blockquote className="m-0 font-rotulo text-lg leading-[1.45] text-tinta-suave">
                {t(`${id}.citacao`)}
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="size-10 shrink-0 rounded-full bg-[repeating-linear-gradient(45deg,oklch(0.7_0.03_60)_0_5px,oklch(0.76_0.03_60)_5px_10px)]" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    {t(`${id}.nome`)}
                  </span>
                  <span className="font-mono text-[10px] text-tinta-suave">
                    {t(`${id}.papel`)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Faixa>
    </section>
  );
}
