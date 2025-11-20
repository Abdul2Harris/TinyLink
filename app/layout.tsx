import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend_Deca, Work_Sans } from "next/font/google";
import "./globals.css";
import { lexendDeca, workSans } from "@/lib/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "TinyLink Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lexendDeca.variable} ${workSans.variable}`}>
      <body className="font-sans bg-gray-50 text-gray-800 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
