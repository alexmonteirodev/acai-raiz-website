"use client";

import poster from "@/assets/reportagem-poster.jpg";

import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

import { SITE } from "@/lib/site";

/**
 * Reportagem do Sergipe Rural sobre a produção.
 *
 * Facade: até alguém clicar, isto é só o poster (43 KB) e nenhum byte sai
 * para o YouTube. O iframe — e todo o rastreamento que vem junto — só nasce
 * no clique. O site antigo já fazia assim e vale manter.
 */
export function VideoReportagem() {
  const t = useTranslations("video");
  const [tocando, setTocando] = useState(false);

  if (tocando) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${SITE.reportagemId}?autoplay=1&rel=0&start=${SITE.reportagemInicio}`}
        title={t("titulo")}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full rounded-2xl border-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTocando(true)}
      aria-label={t("aria")}
      className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl"
    >
      <Image
        src={poster}
        alt={t("posterAlt")}
        fill
        sizes="(max-width: 1024px) 100vw, 400px"
        className="object-cover"
      />
      <span className="absolute inset-0 bg-[oklch(0.2_0.03_42/0.35)] transition-colors group-hover:bg-[oklch(0.2_0.03_42/0.2)]" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-folha shadow-[0_16px_34px_-12px_oklch(0.2_0.03_42/0.7)] transition-transform group-hover:scale-105">
          <Play
            className="ml-0.5 size-6 text-[oklch(0.2_0.02_45)]"
            fill="currentColor"
            strokeWidth={0}
          />
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,oklch(0.2_0.03_42/0.9),transparent)] px-5 pt-10 pb-4 text-left">
        <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-broto">
          {t("eyebrow")}
        </span>
        <span className="mt-1 block font-rotulo text-[15px] leading-tight font-bold text-creme">
          {t("titulo")}
        </span>
      </span>
    </button>
  );
}
