'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import Link from 'next/link';
import { LoaderCircle } from 'lucide-react';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setLoading] = useState(false)
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true)

		try {
			const res = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});

			if (!res.ok) {
				throw new Error('Invalid email or password');
			}

			const { token } = await res.json();
			localStorage.setItem('token', token); // Store token locally
			router.push('/bookings'); // Redirect to protected page
		} catch (err: any) {
			setError(err.message || 'An error occurred');
		} finally {
			setLoading(false)
		}
	};

	return (
		<div className="flex w-full h-screen items-center justify-center">
			<Card className="max-w-[600px] mx-auto backdrop-blur-lg -translate-y-24">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Sign in</CardTitle>
					<CardDescription>
						Enter your email below to sign in to your account
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<form onSubmit={handleLogin}>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								autoCapitalize="none"
								autoComplete="email"
								autoCorrect="off"
								disabled={isLoading}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="grid gap-2 mt-4">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								disabled={isLoading}
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<Button className="w-full mt-6" type="submit" disabled={isLoading}>
							{isLoading && (
								<LoaderCircle className="animate-spin" />
							)}
							Sign In
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col">
					<div className="mt-2 text-center text-sm text-muted-foreground">
						<Link className="hover:text-primary underline underline-offset-4" href="#">
							Forgot password?
						</Link>
					</div>
					<div className="mt-2 text-center text-sm text-muted-foreground">
						{error && <p style={{ color: 'red' }}>{error}</p>}
						{/* Don&apos;t have an account?{" "}
						<Link className="hover:text-primary underline underline-offset-4" href="#">
							Sign up
						</Link> */}
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}