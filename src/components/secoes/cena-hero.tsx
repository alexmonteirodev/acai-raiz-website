"use client";

import { Leaf, Zap, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef } from "react";

import xicara from "@/assets/hero-xicara.png";

const SELOS = [
  {
    chave: "organico",
    Icone: Leaf,
    fundo: "oklch(0.9 0.06 130)",
    pos: "top-[22%] left-[4%]",
    d: 40,
  },
  {
    chave: "energia",
    Icone: Zap,
    fundo: "oklch(0.92 0.06 85)",
    pos: "top-[40%] -right-[8%]",
    d: 46,
  },
  {
    chave: "brasileiro",
    Icone: Globe,
    fundo: "oklch(0.9 0.05 320)",
    pos: "bottom-[4%] left-[12%]",
    d: 36,
  },
] as const;

/**
 * A xícara com os anéis concêntricos e os três selos flutuantes.
 *
 * Os selos seguem o ponteiro com profundidades diferentes (o `d` de cada um),
 * o que dá o paralaxe do design. Sem ponteiro — toque, teclado — a cena fica
 * parada e continua legível, e quem pediu menos movimento não recebe nenhum.
 */
export function CenaHero() {
  const t = useTranslations("hero");
  const cena = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cena.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const alvos = Array.from(
      el.querySelectorAll<HTMLElement>("[data-profundidade]"),
    );
    const mover = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      for (const alvo of alvos) {
        const d = Number(alvo.dataset.profundidade) || 0;
        alvo.style.translate = `${-x * d}px ${-y * d}px`;
      }
    };
    const sair = () => {
      for (const alvo of alvos) alvo.style.translate = "0px 0px";
    };

    el.addEventListener("pointermove", mover);
    el.addEventListener("pointerleave", sair);
    return () => {
      el.removeEventListener("pointermove", mover);
      el.removeEventListener("pointerleave", sair);
    };
  }, []);

  return (
    <div
      ref={cena}
      className="relative h-[360px] sm:h-[480px] lg:h-[620px]"
      aria-hidden={false}
    >
      {/* anéis concêntricos, todos centrados no mesmo ponto */}
      <div className="absolute top-1/2 left-1/2 size-[640px] max-w-[170%] -translate-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,oklch(0.88_0.06_110/0.5),transparent_68%)] blur-[48px]" />
      <div className="absolute top-1/2 left-1/2 size-[460px] max-w-[120%] -translate-1/2 rounded-full border border-folha/45" />
      <div className="absolute top-1/2 left-1/2 size-[560px] max-w-[145%] -translate-1/2 rounded-full border border-dashed border-[oklch(0.82_0.035_95)]" />
      <div className="absolute top-1/2 left-1/2 size-[660px] max-w-[175%] -translate-1/2 rounded-full border border-[oklch(0.88_0.025_95)]" />

      {/* pontinhos de brilho */}
      <span className="absolute top-[28%] left-[6%] size-2 rounded-full bg-folha shadow-[0_0_14px_4px_oklch(0.62_0.13_118/0.4)]" />
      <span className="absolute top-[16%] right-[10%] size-1.5 rounded-full bg-[oklch(0.55_0.12_40)] shadow-[0_0_12px_4px_oklch(0.55_0.12_40/0.35)]" />
      <span className="absolute right-[24%] bottom-[10%] size-[5px] rounded-full bg-folha shadow-[0_0_10px_3px_oklch(0.62_0.13_118/0.35)]" />

      <div className="absolute w-[750px] -right-[220px] -top-[50px] lg:top-[310] lg:left-[325] z-4 lg:w-[950px] lg:-translate-1/2">
        <Image
          src={xicara}
          alt={t("xicaraAlt")}
          priority
          className="h-auto w-full"
        />
      </div>

      {SELOS.map(({ chave, Icone, fundo, pos, d }) => (
        <div
          key={chave}
          data-profundidade={d}
          className={`absolute ${pos} z-[5] flex items-center gap-2.5 rounded-full border border-borda/70 bg-creme-claro/85 py-[11px] pr-[18px] pl-[13px] shadow-[0_16px_34px_-20px_oklch(0.3_0.03_45/0.5)] transition-[translate] duration-[400ms] ease-[cubic-bezier(.2,.7,.3,1)]`}
        >
          <span
            className="flex size-[30px] items-center justify-center rounded-full"
            style={{ background: fundo }}
          >
            <Icone className="size-4 text-tinta" strokeWidth={1.8} />
          </span>
          <span className="font-rotulo text-[13.5px] font-bold whitespace-nowrap text-tinta">
            {t(`selos.${chave}`)}
          </span>
        </div>
      ))}
    </div>
  );
}
