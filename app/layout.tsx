import { Metadata } from 'next';

import { SITE } from '~/config.js';

import Providers from '~/components/atoms/Providers';
import Header from '~/components/widgets/Header';
import Footer2 from '~/components/widgets/Footer2';

import { Inter as CustomFont } from 'next/font/google';
import '~/assets/styles/base.css';
import ContactUsWidget from '~/components/widgets/ContactUsWidget';
import { Toaster } from '~/components/ui/toaster';
import { cn } from '~/lib/utils';

const customFont = CustomFont({ subsets: ['latin'], variable: '--font-custom' });

export interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: ``,
    default: SITE.title,
  },
  description: SITE.description,
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`motion-safe:scroll-smooth 2xl:text-[24px] ${customFont.variable} font-sans`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={cn(
        "tracking-tight antialiased text-gray-900 dark:text-slate-300 dark:bg-gradient-to-r dark:from-slate-800 dark:to-sky-900 backdrop-blur-lg",
        "bg-gradient-to-r from-gray-100 to-gray-300"
      )}>
        <Providers>
          <Header />
          <main>
            {children}
          </main>
          <Footer2 />
        </Providers>
        <div id="headlessui-portal-root"></div>
      </body>
    </html>
  );
}
