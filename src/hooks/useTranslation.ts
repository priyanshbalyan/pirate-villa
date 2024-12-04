import { useCallback } from "react";
import useGetTexts from "./useGetTexts"
import locale from 'public/locale/en';

const useTranslation = () => {
  const { data: texts } = useGetTexts()

  const t = useCallback((key: string) => {
    return texts?.[key] as string ?? locale[key as keyof typeof locale] ?? key
  }, [texts]);

  const tArray = useCallback((key: string) => {
    const value = texts?.[key] ?? locale[key as keyof typeof locale] ?? key
    return Array.isArray(value) ? value : [value];
  }, [texts]);

  return { t, tArray }
}

export default useTranslation