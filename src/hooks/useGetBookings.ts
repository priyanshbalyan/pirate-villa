import { useQuery } from '@tanstack/react-query';

export type Booking = {
	id: number;
	name: string;
	email: string;
	checkInDate: string;
	checkOutDate: string;
	villaType: 'north' | 'south';
}

async function getBookings(): Promise<Booking[]> {
	const token = localStorage.getItem('token');

	const response = await fetch('/api/bookings', {
		headers: { Authorization: `Bearer ${token}` },
	})
	const data = await response.json();
	return data as Booking[]
}

export const useGetBookings = () => {
	return useQuery({ queryKey: ['getBookings'], queryFn: () => getBookings() })
}
