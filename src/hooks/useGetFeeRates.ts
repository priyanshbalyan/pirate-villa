import { useQuery } from "@tanstack/react-query"
import { FeeAdjustment } from "~/types";
import { getHeaders } from "~/utils/utils";

async function getFeeRates(): Promise<FeeAdjustment> {
  const response = await fetch(`/api/fee-rate`, { cache: 'no-store', headers: getHeaders() });
  if (!response.ok) throw new Error(await response.json())
  const json = await response.json()
  return json
}

export const getFeeRatesQueryKey = () => [`getFeeRates`]

const useGetFeeRates = () => {
  return useQuery({ queryKey: getFeeRatesQueryKey(), queryFn: () => getFeeRates() })
}

export default useGetFeeRates