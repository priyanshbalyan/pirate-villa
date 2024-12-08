import { VillaType } from "~/types";

async function createReview(
  name: string,
  title: string,
  content: string,
  rating: number,
  villaType: VillaType
) {
  const response = await fetch('/api/reviews/add',
    {
      method: 'POST',
      body: JSON.stringify({
        name,
        title,
        content,
        rating,
        villaType
      })
    })

  const json = await response.json()
  if (!response.ok) {
    const errorResponse = await response.json()
    throw new Error(errorResponse.error || ('Server responded with status ' + response.status))
  }

  return json;
}

export default createReview