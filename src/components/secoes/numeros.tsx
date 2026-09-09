import { useTranslations } from "next-intl";

import { Contador } from "@/components/contador";
import { Faixa } from "@/components/eyebrow";
import { NUMEROS } from "@/lib/conteudo";

export function Numeros() {
  const t = useTranslations("numeros");

  return (
    <Faixa className="grid gap-10 rounded-[22px] p-8 sm:p-11 lg:grid-cols-[minmax(200px,260px)_minmax(0,1fr)] lg:gap-14">
      <div className="flex flex-col gap-2.5 ">
        <h2 className="m-0 font-display text-4xl leading-[1.02] tracking-[-0.03em] text-tinta">
          {t("titulo")}
        </h2>
        <p className="m-0 max-w-[26ch] text-base leading-[1.5] text-tinta-suave ">
          {t("sub")}
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-7 md:grid-cols-4">
        {NUMEROS.map(({ id, valor, sufixo }, i) => (
          <div key={id} className="flex flex-col gap-1.5">
            <dt className="order-2 text-base leading-[1.5] text-tinta-suave">
              {t(id)}
            </dt>
            <dd className="order-1 m-0 font-display text-[46px] leading-none tracking-[-0.03em] text-tinta">
              {/* escalona um pouco para os quatro não subirem em bloco */}
              <Contador valor={valor} atraso={i * 90} />
              {sufixo && <span> {sufixo}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </Faixa>
  );
}
