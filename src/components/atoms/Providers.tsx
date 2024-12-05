'use client';

import { ThemeProvider } from 'next-themes';
import { ReactQueryClientProvider } from './ReactQueryClientProvider';
import { TranslationProvider } from './TranslationProvider';

export interface ProvidersProps {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => (
  <ThemeProvider attribute="class" disableTransitionOnChange>
    <ReactQueryClientProvider>
      <TranslationProvider>
        {children}
      </TranslationProvider>
    </ReactQueryClientProvider>
  </ThemeProvider>
);

export default Providers;
