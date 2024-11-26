import { getHeaders } from "~/utils/utils";

export const deleteManualAdjustment = async (id: number) => {
  const response = await fetch(`/api/manual-adjustments/delete/${id}`, { method: 'DELETE', headers: getHeaders() })
  const json = await response.json()

  return json;
}