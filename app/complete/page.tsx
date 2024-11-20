import type { Metadata } from 'next';

import { SITE } from '~/config.js';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Button } from '~/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
	title: SITE.title,
};

export default function Page({ params, searchParams }: {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const isNorth = !!searchParams && !!searchParams['north']
	const name = !!searchParams && !!searchParams['name'] ? searchParams['name'] : '';
	const email = !!searchParams && !!searchParams['email'] ? searchParams['email'] : '';
	const guests = !!searchParams && !!searchParams['guests'] ? searchParams['guests'] : '';
	const startDate = !!searchParams && !!searchParams['startDate'] ? searchParams['startDate'] : '';
	const endDate = !!searchParams && !!searchParams['endDate'] ? searchParams['endDate'] : '';

	const bg = isNorth ? "bg-[url('/north-miscellaneous.avif')]" : "bg-[url('/south-exterior-1.avif')]"

	return (
		<>
			<div className={`min-h-screen flex items-center justify-center bg-gray-100 p-4 ${bg} bg-cover`}>
				<Card className="w-full max-w-md backdrop-blur-md h-full bg-white/90 dark:bg-[#0f172a]/80">
					<CardHeader className="flex flex-col items-center space-y-2 sm:space-y-4">
						<div className="rounded-full bg-green-100 p-2 sm:p-3">
							<CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
						</div>
						<CardTitle className="text-xl sm:text-2xl font-bold text-center">Booking Complete!</CardTitle>
					</CardHeader>
					<CardContent className="text-center space-y-4 sm:space-y-6">
						<p className="text-sm sm:text-base text-gray-600  dark:text-white">
							Thank you for your booking. We&apos;ve sent a confirmation email to your registered email address.
						</p>
						<div>
							<h3 className="font-semibold text-base sm:text-lg mb-2">Booking Details:</h3>
							<ul className="text-sm sm:text-base text-gray-600 space-y-1  dark:text-white">
								<li className='flex items-start gap-4'>
									<span className='w-4/12 text-right'>Property:</span><span className="w-8/12 text-left">The Pirates Landing {isNorth ? 'North' : 'South'} 3-bedroom condo in fabulous Cruz Bay with WiFi, AC</span>
								</li>
								{startDate && <li className='flex items-start gap-4'>
									<span className='w-4/12 text-right'>Check-in:</span><span className="w-8/12 text-left">{startDate}</span>
								</li>}
								{endDate && <li className='flex items-start gap-4'>
									<span className='w-4/12 text-right'>Check-out:</span><span className="w-8/12 text-left">{endDate}</span>
								</li>}
								{guests && <li className='flex items-start gap-4'>
									<span className='w-4/12 text-right'>Guests:</span><span className="w-8/12 text-left">{guests}</span>
								</li>}
							</ul>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col space-y-2 sm:space-y-3">
						<Link href="/" className='w-full'>
							<Button variant="outline" className="w-full text-sm sm:text-base py-2 sm:py-3  bg-black text-white ">Return to Home</Button>
						</Link>
					</CardFooter>
				</Card>
			</div>
		</>
	);
}
