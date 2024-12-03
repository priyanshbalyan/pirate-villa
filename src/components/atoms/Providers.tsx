'use client';

import { ThemeProvider } from 'next-themes';
import { ReactQueryClientProvider } from './ReactQueryClientProvider';
import { Toaster } from '~/components/ui/toaster';

export interface ProvidersProps {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => (
  <ThemeProvider attribute="class" disableTransitionOnChange>
    <ReactQueryClientProvider>
      {children}
      <Toaster />
    </ReactQueryClientProvider>
  </ThemeProvider>
);

export default Providers;
