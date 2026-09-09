import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Sempre navegue por estes, nunca por `next/link` ou `next/navigation`:
 * são eles que carregam o locale atual para a URL de destino.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
