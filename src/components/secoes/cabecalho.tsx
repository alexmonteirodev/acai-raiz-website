"use client";

import logo from "@/assets/logo.jpg";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

import { Link } from "@/i18n/navigation";

// ordem do seletor no design, que não é a ordem de routing.locales
const IDIOMAS = ["pt", "es", "en"] as const;

const SECOES = [
  { href: "#produto", chave: "produtos" },
  { href: "#beneficios", chave: "beneficios" },
  { href: "#contato", chave: "contato" },
] as const;

/**
 * Nav em pílula flutuante. O `-mb-[110px]` faz ela pousar por cima do hero,
 * como no design; o hero compensa com o padding-top.
 */
export function Cabecalho({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const tLang = useTranslations("lang");
  const [aberto, setAberto] = useState(false);

  return (
    <div className="sticky top-4 z-30 px-5 md:px-10 lg:-mb-[110px] ">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 rounded-[28px] border border-borda/90 bg-[#FFFAF1] py-2.5 pr-3.5 pl-6 shadow-[0_22px_48px_-26px_oklch(0.3_0.03_45/0.45)] backdrop-blur-[14px] lg:rounded-full ">
        <a href="#" className="flex shrink-0 items-center gap-2.5 ">
          <Image
            src={logo}
            alt={t("logoAlt")}
            width={64}
            height={61}
            priority
            className="-my-3.5 h-[52px] w-auto mix-blend-multiply lg:h-[61px] "
          />
        </a>

        <div className="hidden items-center gap-[34px] lg:flex">
          {SECOES.map(({ href, chave }) => (
            <a
              key={href}
              href={href}
              className="text-[14.5px] font-medium text-tinta-suave transition-colors hover:text-tinta"
            >
              {t(chave)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3.5">
          <div
            role="group"
            aria-label={tLang("aria")}
            className="flex items-center gap-0.5 rounded-full bg-areia p-1"
          >
            {IDIOMAS.map((cod) => (
              <Link
                key={cod}
                href="/"
                locale={cod}
                aria-current={cod === locale ? "page" : undefined}
                className={
                  "rounded-full px-2.5 py-1.5 font-mono text-[11px] tracking-[0.06em] transition-colors " +
                  (cod === locale
                    ? "bg-creme-claro text-tinta"
                    : "text-tinta-suave hover:text-tinta")
                }
              >
                {cod.toUpperCase()}
              </Link>
            ))}
          </div>

          <a
            href="#contato"
            className="hidden rounded-full bg-folha px-[22px] py-[13px] text-sm font-bold text-white transition-opacity hover:opacity-90 sm:block"
          >
            {t("cta")}
          </a>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-label={aberto ? t("fecharMenu") : t("abrirMenu")}
            className="rounded-full p-2 text-tinta lg:hidden"
          >
            {aberto ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {aberto && (
        <div className="mx-auto mt-2 flex max-w-[1280px] flex-col gap-1 rounded-3xl border border-borda/90 bg-creme-claro/95 p-4 backdrop-blur-[14px] lg:hidden">
          {SECOES.map(({ href, chave }) => (
            <a
              key={href}
              href={href}
              onClick={() => setAberto(false)}
              className="rounded-xl px-3 py-2.5 font-medium text-tinta hover:bg-areia"
            >
              {t(chave)}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setAberto(false)}
            className="mt-1 rounded-full bg-folha px-[22px] py-3 text-center text-sm font-bold text-white sm:hidden"
          >
            {t("cta")}
          </a>
        </div>
      )}
    </div>
  );
}
