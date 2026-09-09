import { useTranslations } from "next-intl";
import Image from "next/image";

import { Eyebrow, Faixa } from "@/components/eyebrow";
import { GALERIA } from "@/lib/conteudo";
import { SITE } from "@/lib/site";

export function InstagramSecao() {
  const t = useTranslations("instagram");

  return (
    <section
      id="instagram"
      className="bg-[oklch(0.945_0.028_85)] py-16 lg:py-24"
    >
      <Faixa className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <Eyebrow className="text-uva">{t("eyebrow")}</Eyebrow>
            <h2 className="m-0 font-display text-[40px] leading-none tracking-[-0.035em] lg:text-[52px]">
              @{SITE.instagram}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-[oklch(0.24_0.02_45)] px-6 py-3.5 text-[15px] font-semibold text-creme transition-opacity hover:opacity-90"
            >
              {t("cta")}
            </a>
          </div>
        </div>

        <ul className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {GALERIA.map(({ id, img }) => (
            <li
              key={id}
              className="relative aspect-square overflow-hidden rounded-xl bg-areia"
            >
              <Image
                src={img}
                alt={t(`fotos.${id}`)}
                fill
                sizes="(max-width: 768px) 33vw, 200px"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </Faixa>
    </section>
  );
}
