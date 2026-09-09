import { Bean, Coffee, Grape, Leaf } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Faixa } from "@/components/eyebrow";
import { TAGS } from "@/i18n/rich";
import { ESSENCIA } from "@/lib/conteudo";

const ICONES = { cafe: Coffee, cacau: Bean, acai: Grape } as const;

export function Essencia() {
  const t = useTranslations("essencia");

  return (
    <section id="beneficios" className="py-16 lg:py-24">
      <Faixa className="grid gap-12 lg:grid-cols-[minmax(300px,0.85fr)_minmax(0,1.4fr)] lg:gap-[72px] ">
        <div className="flex flex-col gap-5">
          <span className="inline-flex w-fit items-center gap-2.5 rounded-full bg-areia px-4 py-2 font-mono text-[10.5px] tracking-[0.14em] uppercase text-terra">
            <Leaf className="size-3.5" strokeWidth={1.8} />
            {t("eyebrow")}
          </span>
          <h2 className="m-0 font-display text-[38px] leading-none text-balance text-tinta lg:text-[46px]">
            {t.rich("titulo", TAGS)}
          </h2>
          <p className="m-0 max-w-[40ch] text-lg leading-[1.6] text-tinta-suave lg:text-xl lg:w-92.5">
            {t("desc")}
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-3">
          {ESSENCIA.map(({ id, img }) => {
            const Icone = ICONES[id];
            return (
              <li
                key={id}
                className="relative h-[320px] overflow-hidden rounded-[20px] bg-casca lg:h-[500px] "
              >
                <Image
                  src={img}
                  alt={t(`${id}.alt`)}
                  fill
                  sizes="(max-width: 640px) 100vw, 30vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.2_0.03_42/0.92)_0%,oklch(0.22_0.03_42/0.55)_38%,transparent_72%)] " />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 px-6 pt-6 pb-7">
                  <span className="flex size-11 items-center justify-center rounded-full border border-creme/35 bg-creme/15">
                    <Icone className="size-5 text-creme" strokeWidth={1.6} />
                  </span>
                  <span className="font-rotulo text-[21px] leading-[1.15] font-bold text-creme">
                    {t(`${id}.titulo`)}
                  </span>
                  <span className="text-[14.5px] leading-[1.5] text-tinta-clara">
                    {t(`${id}.desc`)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </Faixa>
    </section>
  );
}
