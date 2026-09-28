import { Mail, MapPin, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { Eyebrow } from "@/components/eyebrow";
import { VideoReportagem } from "@/components/secoes/video-reportagem";
import { SITE, whatsappUrl } from "@/lib/site";

// o telefone só é formatado para leitura; o número canônico está em site.ts
const whatsappLegivel = SITE.whatsapp.replace(
  /^(\d{2})(\d{2})(\d{5})(\d{4})$/,
  "+$1 ($2) $3-$4",
);

export function Contato() {
  const t = useTranslations("contato");

  const linhas = [
    {
      id: "email",
      Icone: Mail,
      valor: SITE.email,
      href: `mailto:${SITE.email}`,
    },
    { id: "local", Icone: MapPin, valor: t("localVal"), href: undefined },
    {
      id: "whatsapp",
      Icone: MessageCircle,
      valor: whatsappLegivel,
      href: whatsappUrl(),
    },
  ] as const;

  return (
    <section id="contato" className="bg-casca-escura py-16 text-creme">
      <div className="mx-auto grid w-full max-w-[1040px] gap-12 px-5 md:px-6 lg:grid-cols-[1.2fr_minmax(0,0.8fr)]">
        <div className="flex flex-col gap-7">
          <Eyebrow className="text-broto">{t("eyebrow")}</Eyebrow>
          <h2 className="m-0 font-display text-[38px] leading-[1.02] tracking-[-0.035em] text-balance lg:text-[48px]">
            {t("titulo")}
          </h2>
          <p> {t("subtitulo")}</p>
          <dl className="flex flex-col">
            {linhas.map(({ id, Icone, valor, href }) => (
              <div
                key={id}
                className="flex items-center gap-4 border-b border-[oklch(0.34_0.02_45)] py-4 lg:max-w-xs"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[oklch(0.34_0.03_45)]">
                  <Icone
                    className="size-[18px] text-tinta-clara"
                    strokeWidth={1.7}
                  />
                </span>
                <div className="flex flex-col gap-[3px]">
                  <dt className="font-mono text-[10px] tracking-[0.1em] uppercase text-[oklch(0.68_0.02_60)]">
                    {t(id)}
                  </dt>
                  <dd className="m-0 text-base font-medium">
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener"
                        className="hover:underline"
                      >
                        {valor}
                      </a>
                    ) : (
                      valor
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener"
            className="w-fit tracking-[-0.01em] rounded-full bg-folha px-7 py-4 text-[15px] font-bold text-white transition-opacity hover:opacity-90"
          >
            {t("cta")}
          </a>
        </div>

        {/* o design pedia "[ MAPA ou FOTO ]" aqui; entrou a reportagem */}
        <div className="lg:self-center lg:scale-150">
          <VideoReportagem />
        </div>
      </div>
    </section>
  );
}
