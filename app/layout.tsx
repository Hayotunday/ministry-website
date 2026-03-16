import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
