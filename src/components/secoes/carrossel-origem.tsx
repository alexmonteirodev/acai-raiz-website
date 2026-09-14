"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { ORIGEM_FOTOS } from "@/lib/conteudo";

const INTERVALO = 2000;

/**
 * As fotos da produção familiar passando na moldura da seção Origem.
 *
 * Segue as duas regras de animação da casa: o HTML do servidor já traz a
 * primeira foto visível — sem JS, ou com ele quebrado, a moldura continua
 * certa, só não passa — e nada se move para quem pediu menos movimento.
 *
 * O relógio só anda com a moldura na tela, e clicar num ponto trava a
 * passagem de vez: quem assumiu o controle não quer a foto trocando embaixo
 * da mão.
 */
export function CarrosselOrigem() {
  const t = useTranslations("origem");
  const [atual, setAtual] = useState(0);
  const [naTela, setNaTela] = useState(false);
  const [travado, setTravado] = useState(false);
  const moldura = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = moldura.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observador = new IntersectionObserver(
      ([entrada]) => setNaTela(entrada.isIntersecting),
      { threshold: 0.2 },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    if (!naTela || travado) return;

    const relogio = setInterval(
      () => setAtual((i) => (i + 1) % ORIGEM_FOTOS.length),
      INTERVALO,
    );
    return () => clearInterval(relogio);
  }, [naTela, travado]);

  return (
    <div
      ref={moldura}
      className="relative h-[360px] overflow-hidden rounded-[20px] bg-casca-escura lg:h-[560px]"
    >
      {ORIGEM_FOTOS.map(({ id, img, foco }, i) => (
        <Image
          key={id}
          src={img}
          alt={t(`fotos.${id}`)}
          fill
          sizes="(max-width: 1024px) 100vw, 600px"
          style={{ objectPosition: foco }}
          aria-hidden={i !== atual}
          className={`object-cover transition-opacity duration-700 ease-out ${
            i === atual ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* escurece o pé da foto para os pontos não sumirem contra o céu */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,oklch(0.2_0.03_42/0.6),transparent)]" />

      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 p-5">
        {ORIGEM_FOTOS.map(({ id }, i) => (
          <button
            key={id}
            type="button"
            aria-label={t("verFoto", { n: i + 1 })}
            aria-current={i === atual}
            onClick={() => {
              setTravado(true);
              setAtual(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === atual ? "w-6 bg-creme" : "w-1.5 bg-creme/45 hover:bg-creme/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
