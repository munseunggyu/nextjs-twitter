import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MSWComponent } from './_component/MSWComponent';
import AuthSession from './_component/AuthSession';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Z.com',
  description: 'Good'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <MSWComponent />
        <AuthSession>{children}</AuthSession>
      </body>
    </html>
  );
}
