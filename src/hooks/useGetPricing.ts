import { useQuery } from "@tanstack/react-query"
import { Pricing } from "~/types";
import { getHeaders } from "~/utils/utils";

async function getPricing(): Promise<Pricing[]> {
  const response = await fetch(`/api/pricing`, { cache: 'no-store', headers: getHeaders() });
  if (!response.ok) throw new Error(await response.json())
  const json = await response.json()
  return json
}

export const getPricingQueryKey = () => [`getPricing`]

const useGetPricing = () => {
  return useQuery({ queryKey: getPricingQueryKey(), queryFn: () => getPricing() })
}

export default useGetPricing