import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Ekklesia Elite Evangelical Ministry",
  description:
    "Nurturing the next generation of Christian leaders and changemakers",
  generator: "hayotunday",
  applicationName: "Ekklesia Elite Evangelical Ministry",
  icons: {
    icon: [
      {
        url: "/imgs/ekklisa-elite.jpeg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/imgs/ekklisa-elite.jpeg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  keywords: [
    "ekklesia elite evangelical ministry in ikorodu",
    "ekklesia elite evangelical ministry",
    "ekklesia elite",
    "ekklesia elite ikorodu",
    "ekklesia elite team",
    "ekklesia elite team in ikorodu",
    "Christian community in ikorodu",
    "repairer of the breach",
    "Christian leadership in ikorodu",
    "evangelical ministry in ikorodu",
    "teens ministry in ikorodu",
    "youth ministry in ikorodu",
    "spiritual growth",
    "community outreach in ikorodu",
    "Mojisola Olawale",
    "JFFX+2QC, Lagos Rd, Ikorodu, 104101, Lagos, Nigeria",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
