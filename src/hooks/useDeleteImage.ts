import { getHeaders } from "~/utils/utils";

export const deleteImage = async (id: string) => {
  const image = id.replace('/api/uploads/', '').replace(/\//g, '')
  const response = await fetch(`/api/images/delete/${image}`, { method: 'DELETE', headers: getHeaders() })
  const json = await response.json()
  if (!response.ok) {
    throw new Error(json)
  }

  return json;
}