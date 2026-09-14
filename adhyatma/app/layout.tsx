import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { SadhanaProvider } from "../contexts/SadhanaContext";
import AuthProvider from "../components/AuthProvider"; // NEW

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adhyatma",
  description: "Your spiritual journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAF9F6] text-stone-800 min-h-screen selection:bg-amber-200 selection:text-stone-900`}
      >
        <AuthProvider>
          <SadhanaProvider>
            <Navbar />
            {children}
          </SadhanaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
