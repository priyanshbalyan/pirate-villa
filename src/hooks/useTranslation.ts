import { useCallback } from "react";
import useGetTexts from "./useGetTexts"
import locale from 'public/locale/en';

const useTranslation = () => {
  const { data: texts } = useGetTexts()

  const t = useCallback((key: string) => {
    if (texts) {
      return texts[key] as string ?? locale[key as keyof typeof locale] ?? key
    }
    return key;
  }, [texts]);

  const tArray = useCallback((key: string) => {
    if (texts) {
      const value = texts[key] ?? locale[key as keyof typeof locale] ?? key
      return Array.isArray(value) ? value : [value];
    }
    return [key];
  }, [texts]);

  return { t, tArray }
}

export default useTranslation