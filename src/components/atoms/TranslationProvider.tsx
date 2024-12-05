'use client';

import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";
import useTranslation from "~/hooks/useTranslation";

export function TranslationProvider({ children }: { children: ReactNode }) {
  const { isLoading } = useTranslation()

  return isLoading ? <div className="w-full h-screen flex items-center justify-center"><LoaderCircle className="animate-spin" /></div> : children
}