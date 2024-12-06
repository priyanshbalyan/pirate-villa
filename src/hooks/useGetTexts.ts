import { useQuery } from "@tanstack/react-query"
import { Text, TextMap } from "~/types";
import { getHeaders } from "~/utils/utils";

async function getTexts(): Promise<TextMap> {
  const response = await fetch(`/api/texts`, { cache: 'no-store', headers: getHeaders(), method: 'POST' });
  if (!response.ok) throw new Error(await response.json())
  const json = await response.json()
  return json
}

export const getTextsQueryKey = () => [`GetTexts`]

const useGetTexts = () => {
  return useQuery({ queryKey: getTextsQueryKey(), queryFn: () => getTexts() })
}

export default useGetTexts