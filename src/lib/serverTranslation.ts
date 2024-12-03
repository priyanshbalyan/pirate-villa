import locale from 'public/locale/en';
import { Text, TextMap } from '~/types';
import { openDb } from './db';
import { getTextMap } from '~/utils/utils';

let cachedTexts: TextMap | null = null;

export async function getServerTranslation(): Promise<{
  t: (key: string) => string; tArray: (key: string) => string[]
}> {
  if (cachedTexts) {
    return {
      t: (key: string) => (cachedTexts?.[key] ?? locale[key as keyof typeof locale] ?? key) as string,
      tArray: (key: string) => {
        const value = cachedTexts?.[key] ?? locale[key as keyof typeof locale] ?? key;
        return Array.isArray(value) ? value : [value]
      }
    };
  }

  try {
    const textMaps = await fetchServerTexts();
    const cachedTexts = textMaps
    // Utility function to get text by key
    const t = (key: string): string => (textMaps[key] ?? locale[key as keyof typeof locale] ?? key) as string;
    const tArray = (key: string) => {
      const value = cachedTexts?.[key] ?? locale[key as keyof typeof locale] ?? key;
      return Array.isArray(value) ? value : [value]
    }
    return { t, tArray };
  } catch (err) {
    console.error(err);
    return {
      t: (key: string) => (locale[key as keyof typeof locale] ?? key) as string,
      tArray: (key: string) => {
        const value = locale[key as keyof typeof locale] ?? key;
        return Array.isArray(value) ? value : [value]
      }
    };
  }
}

export async function fetchServerTexts() {
  const db = await openDb()
  const texts = await db.all<Text[]>('SELECT * FROM texts')

  const textMap = getTextMap(texts)
  return textMap
}

