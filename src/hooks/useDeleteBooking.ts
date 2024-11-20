
export const deleteBooking = async (id: number) => {
    const response = await fetch(`/api/delete-booking/${id}`, { method: 'DELETE' })
    const json = await response.json()

    return json;
}