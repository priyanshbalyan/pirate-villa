import { getHeaders } from "~/utils/utils";

async function modifyReview(
  id: number,
  action: 'delete' | 'approve' | 'reject',
) {
  const response = await fetch('/api/reviews/modify/' + id,
    {
      method: 'POST',
      body: JSON.stringify({
        action,
      }),
      headers: getHeaders()
    })

  const json = await response.json()
  if (!response.ok) {
    const errorResponse = await response.json()
    throw new Error(errorResponse.error || ('Server responded with status ' + response.status))
  }

  return json;
}

export default modifyReview