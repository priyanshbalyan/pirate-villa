'use client';

import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

export default function DashboardPage({ children }: { children: ReactElement }) {
	const [data, setData] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (!token) {
			router.push('/login'); // Redirect to login if no token
			return;
		}

		fetch('/api/secure-data', {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => {
				if (!res.ok) throw new Error('Failed to fetch secure data');
				return res.json();
			})
			.then((data) => setData(data.message))
			.catch((err) => {
				console.error(err);
				setError('Unauthorized');
				router.push('/login');
			});
	}, [router]);

	if (error) return <p>{error}</p>;
	if (!data) return <div className="w-screen h-screen flex items-center justify-center"><LoaderCircle className="animate-spin" /></div>;

	return (
    <QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}