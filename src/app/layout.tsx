import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
