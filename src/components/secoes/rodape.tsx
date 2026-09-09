import logo from "@/assets/logo.jpg";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Faixa } from "@/components/eyebrow";

const LINKS = [
  { href: "#produto", chave: "produto" },
  { href: "#origem", chave: "origem" },
  { href: "#instagram", chave: "instagram" },
  { href: "#contato", chave: "contato" },
] as const;

export function Rodape() {
  const t = useTranslations("rodape");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-noite py-8 text-[oklch(0.72_0.02_70)]">
      <Faixa className="flex flex-wrap items-center justify-between gap-8">
        <span className="flex size-[60px] items-center justify-center rounded-full bg-creme">
          <Image
            src={logo}
            alt={tNav("logoAlt")}
            width={52}
            height={52}
            className="h-[52px] w-auto mix-blend-multiply"
          />
        </span>

        <nav className="flex flex-wrap gap-6">
          {LINKS.map(({ href, chave }) => (
            <a
              key={href}
              href={href}
              className="text-[13px] transition-colors hover:text-creme"
            >
              {t(chave)}
            </a>
          ))}
        </nav>

        <span className="font-mono text-[10px] text-[oklch(0.5_0.02_60)]">
          {t("copy")}
        </span>
      </Faixa>
    </footer>
  );
}
