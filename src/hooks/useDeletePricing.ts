import { getHeaders } from "~/utils/utils";

export const deletePricing = async (id: number) => {
  const response = await fetch(`/api/pricing/delete/${id}`, { method: 'DELETE', headers: getHeaders() })
  const json = await response.json()

  return json;
}