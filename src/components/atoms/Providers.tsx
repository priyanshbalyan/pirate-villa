'use client';

import { ThemeProvider } from 'next-themes';
import { ReactQueryClientProvider } from './ReactQueryClientProvider';

export interface ProvidersProps {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => (
  <ThemeProvider attribute="class" disableTransitionOnChange>
    <ReactQueryClientProvider>
      {children}
    </ReactQueryClientProvider>
  </ThemeProvider>
);

export default Providers;
