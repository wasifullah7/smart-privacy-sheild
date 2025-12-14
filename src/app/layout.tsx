import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Smart Privacy Shield | AI-Powered Video Privacy Protection",
  description:
    "Upload a video, select objects or people, and let AI automatically track and blur them. Professional privacy protection for your videos.",
  keywords: ["video privacy", "AI blur", "object tracking", "face blur", "video anonymization"],
  openGraph: {
    title: "Smart Privacy Shield | AI-Powered Video Privacy Protection",
    description: "Upload a video, select objects or people, and let AI automatically track and blur them.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-[#0A0A0B] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
