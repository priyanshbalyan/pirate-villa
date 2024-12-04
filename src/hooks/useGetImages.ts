import { useQuery } from "@tanstack/react-query"
import { getHeaders } from "~/utils/utils";

async function getImages(): Promise<string[]> {
  const response = await fetch(`/api/images`, { cache: 'no-store', headers: getHeaders() });
  if (!response.ok) throw new Error(await response.json())
  const json = await response.json()
  return json
}

export const getImagesQueryKey = () => [`getImages`]

const useGetImages = () => {
  return useQuery({ queryKey: getImagesQueryKey(), queryFn: () => getImages() })
}

export default useGetImages