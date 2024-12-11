import { FeeAdjustment, TextMap } from "~/types";
import { getHeaders } from "~/utils/utils";

async function updateFeeRate(data: FeeAdjustment) {
  const response = await fetch('/api/fee-rate/modify',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: getHeaders(),
    })

  const json = await response.json()
  if (!response.ok) {
    const errorResponse = json
    throw new Error(errorResponse.error || ('Server responded with status ' + response.status))
  }

  return json;
}

export default updateFeeRate