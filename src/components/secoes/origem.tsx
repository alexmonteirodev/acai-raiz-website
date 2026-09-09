import { useTranslations } from "next-intl";

import { Eyebrow, Faixa } from "@/components/eyebrow";
import { TAGS } from "@/i18n/rich";
import { ETAPAS } from "@/lib/conteudo";

export function Origem() {
  const t = useTranslations("origem");

  return (
    <section id="origem" className="bg-casca py-16 text-creme lg:py-24">
      <Faixa className="grid gap-12 lg:grid-cols-2 lg:gap-[72px]">
        {/* placeholder do design: entra a foto da produção familiar quando houver */}
        <div className="flex h-[360px] items-center justify-center rounded-[20px] bg-[repeating-linear-gradient(135deg,oklch(0.4_0.05_40)_0_10px,oklch(0.35_0.05_40)_10px_20px)] text-center lg:h-[560px]">
          <span className="font-mono text-xs leading-[1.7] text-[oklch(0.92_0.025_85)]">
            {t.rich("fotoLegenda", TAGS)}
          </span>
        </div>

        <div className="flex flex-col gap-6">
          <Eyebrow className="text-broto">{t("eyebrow")}</Eyebrow>
          <h2 className="m-0 font-display text-[38px] leading-[1.02] tracking-[-0.03em] text-balance lg:text-[46px]">
            {t("titulo")}
          </h2>

          <ol className="flex flex-col">
            {ETAPAS.map(({ id, n }) => (
              <li
                key={id}
                className="flex gap-5 border-t border-[oklch(0.36_0.02_45)] py-[18px]"
              >
                <span className="w-[30px] shrink-0 font-mono text-xs text-broto">
                  {n}
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="font-rotulo text-[18px] font-bold">
                    {t(`etapas.${id}.titulo`)}
                  </span>
                  <span className="text-base leading-[1.5] text-[oklch(0.8_0.02_70)]">
                    {t(`etapas.${id}.desc`)}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Faixa>
    </section>
  );
}
