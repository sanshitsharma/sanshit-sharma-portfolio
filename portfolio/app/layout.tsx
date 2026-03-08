import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sanshit Sharma | GenAI Platform Engineer',
  description: 'Portfolio of Sanshit Sharma - SDE @ Amazon Web Services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.className} bg-slate-950 text-slate-200 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
