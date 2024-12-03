import { TextMap } from "~/types";
import { getHeaders } from "~/utils/utils";

async function updateTexts(texts: TextMap) {
  const response = await fetch('/api/update-texts',
    {
      method: 'POST',
      body: JSON.stringify(texts),
      headers: getHeaders(),
    })

  const json = await response.json()
  if (!response.ok) {
    const errorResponse = await response.json()
    throw new Error(errorResponse.error || ('Server responded with status ' + response.status))
  }

  return json;
}

export default updateTexts