import { getHeaders } from "~/utils/utils";

export const deleteBooking = async (id: number) => {
    const response = await fetch(`/api/delete-booking/${id}`, { method: 'DELETE', headers: getHeaders() })
    const json = await response.json()

    return json;
}