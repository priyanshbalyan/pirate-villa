import { useQuery } from "@tanstack/react-query"
import { ManualAdjustment } from "~/types";

async function getManualAdjustments(): Promise<ManualAdjustment[]> {
  const response = await fetch(`/api/manual-adjustments`, { cache: 'no-store' });
  if (!response.ok) throw new Error(await response.json())
  const json = await response.json()
  return json
}

export const getManualAdjustmentQueryKey = () => [`getManualAdjustments`]

const useGetManualAdjustments = () => {
  return useQuery({ queryKey: getManualAdjustmentQueryKey(), queryFn: () => getManualAdjustments() })
}

export default useGetManualAdjustments