import { cn } from "@/lib/utils";

/**
 * O rótulo em mono que abre cada seção ("03 · linha completa"). Aparece oito
 * vezes no design, sempre igual — só muda a cor conforme o fundo.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] tracking-[0.16em] uppercase text-terra ",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Faixa de largura das seções: 1280px com respiro lateral. */
export function Faixa({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1280px] px-5 md:px-10 ", className)}
    >
      {children}
    </div>
  );
}
