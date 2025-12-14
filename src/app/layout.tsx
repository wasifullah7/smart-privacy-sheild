import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/components.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Smart Privacy Shield | AI-Powered Video Privacy Protection',
  description: 'Protect sensitive information in your videos with AI-powered privacy tools. Blur faces, mask data, and secure your content with just a few clicks.',
  keywords: ['privacy', 'video', 'AI', 'blur', 'mask', 'protection', 'security'],
  authors: [{ name: 'Smart Privacy Shield' }],
  openGraph: {
    title: 'Smart Privacy Shield | AI-Powered Video Privacy Protection',
    description: 'Protect sensitive information in your videos with AI-powered privacy tools.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
