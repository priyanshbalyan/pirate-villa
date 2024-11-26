import { useQuery } from '@tanstack/react-query';
import { getHeaders } from '~/utils/utils';

export type Booking = {
	id: number;
	name: string;
	email: string;
	checkInDate: string;
	checkOutDate: string;
	villaType: 'north' | 'south';
}

async function getBookings(): Promise<Booking[]> {

	const response = await fetch('/api/bookings', {
		headers: getHeaders(),
	})
	const data = await response.json();
	return data as Booking[]
}

export const getBookingsQueryKey = ['getBookings']

export const useGetBookings = () => {
	return useQuery({ queryKey: getBookingsQueryKey, queryFn: () => getBookings() })
}
