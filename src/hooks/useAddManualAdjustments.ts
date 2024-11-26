import { endOfDay, format, startOfDay } from "date-fns";

async function addManualAdjustment(
  amount: number,
  date: Date,
  villaType: 'north' | 'south',
) {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/manual-adjustments/add',
    {
      method: 'POST',
      body: JSON.stringify({
        nightlyRate: amount,
        date: format(startOfDay(date), 'yyyy-MM-dd'),
        villaType,
      }),
      headers: { Authorization: `Bearer ${token}` },
    })

  const json = await response.json()
  if (!response.ok) {
    throw new Error(json.error || ('Server responded with status ' + response.status))
  }

  return json;
}

export default addManualAdjustment