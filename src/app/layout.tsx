import type { Metadata } from 'next';

import { Header } from '@/components/layouts/header';
import { pretendard } from '@/lib/fonts';
import GoogleAnalytics from '@/lib/google-analytics';

import { Providers } from './providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'SulSul',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={pretendard.variable} lang="ko" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <Providers>
          <div className="min-h-[940px] overflow-hidden bg-gray-50">
            <Header />
            <div className="min-h-[calc(100vh-60px)]">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}