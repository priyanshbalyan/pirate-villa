import { endOfDay, format, startOfDay } from "date-fns";

async function addPrice(
  amount: number,
  startDate: Date,
  endDate: Date,
  villaType: 'north' | 'south',
) {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/pricing/add',
    {
      method: 'POST',
      body: JSON.stringify({
        nightlyRate: amount,
        startDate: format(startOfDay(startDate), 'yyyy-MM-dd'),
        endDate: format(endOfDay(endDate), 'yyyy-MM-dd'),
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

export default addPrice