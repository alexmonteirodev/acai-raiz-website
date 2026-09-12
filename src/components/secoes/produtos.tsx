import trio from "@/assets/produtos-trio.png";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Eyebrow, Faixa } from "@/components/eyebrow";
import { PRODUTOS } from "@/lib/produtos";

export function Produtos() {
  const t = useTranslations("produtos");

  return (
    <section id="produto" className="pt-6 pb-20 lg:pb-26">
      <Faixa className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-[72px] ">
        <div className="relative aspect-square overflow-hidden rounded-[22px] order-2 lg:order-1">
          <Image
            src={trio}
            alt={t("trioAlt")}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-6 order-1 lg:order-2">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="m-0 font-display text-[38px] leading-none tracking-[-0.02em] text-balance text-tinta lg:text-[46px] ">
            {t("titulo")}
          </h2>
          <p className="m-0 max-w-[40ch] text-lg leading-[1.6] text-tinta-suave lg:text-xl lg:w-122 ">
            {t("sub")}
          </p>

          <ul className="flex flex-col ">
            {PRODUTOS.map(({ id, n, nome }) => (
              <li
                key={id}
                className="grid grid-cols-[34px_minmax(0,1fr)] gap-5 border-t border-borda py-[22px]"
              >
                <span className="font-mono text-xs text-terra">{n}</span>
                <div className="flex flex-col gap-[7px]">
                  {/* nome não traduz: é o que está impresso na embalagem */}
                  <span className="font-rotulo text-[20px] leading-[1.15] font-bold text-tinta">
                    {nome}
                  </span>
                  <span className="text-[16px] leading-[1.55] text-tinta-suave">
                    {t(`itens.${id}.desc`)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Faixa>
    </section>
  );
}
