"use client";

import { useEffect, useRef } from "react";

const DURACAO = 1400;

/** Ease-out cúbico: arranca rápido e assenta no valor, em vez de parar seco. */
const suavizar = (t: number) => 1 - (1 - t) ** 3;

/**
 * Número que conta de zero até `valor` quando entra na tela.
 *
 * O HTML do servidor já traz o valor final: sem JS, com JS falhando ou para um
 * crawler, o número correto está lá. A animação só reescreve o texto depois de
 * montar — e não roda de jeito nenhum para quem pediu menos movimento.
 *
 * Escreve direto no nó via ref em vez de usar estado: são ~84 quadros por
 * contador, e re-renderizar a árvore a cada quadro não paga o que entrega.
 */
export function Contador({ valor, atraso = 0 }: { valor: number; atraso?: number }) {
  const alvo = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = alvo.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let quadro = 0;
    let relogio: ReturnType<typeof setTimeout>;

    // zera antes de observar, para a contagem começar do começo
    el.textContent = "0";

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect(); // anima uma vez só

        relogio = setTimeout(() => {
          const inicio = performance.now();
          const passo = (agora: number) => {
            const t = Math.min((agora - inicio) / DURACAO, 1);
            el.textContent = String(Math.round(suavizar(t) * valor));
            if (t < 1) quadro = requestAnimationFrame(passo);
          };
          quadro = requestAnimationFrame(passo);
        }, atraso);
      },
      { threshold: 0.4 },
    );

    observador.observe(el);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(quadro);
      clearTimeout(relogio);
    };
  }, [valor, atraso]);

  return <span ref={alvo}>{valor}</span>;
}
