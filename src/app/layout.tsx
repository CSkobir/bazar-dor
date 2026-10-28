import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MarqueeComp from '@/components/MarqueeComp';
import ToastProvider from '@/components/ToastProvider';
import { Suspense } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'বাজার দর - প্রয়োজনীয় পণ্যের দাম এক নজরে | Bazar Dor',
  description:
    'চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।',
  icons: {
    icon: '/logo-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-slate-50/50 text-slate-800 font-sans">
        <ToastProvider />
        <Suspense fallback={<div className="h-20 bg-white border-b border-slate-200"></div>}>
          <Navbar />
        </Suspense>

        <MarqueeComp />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
