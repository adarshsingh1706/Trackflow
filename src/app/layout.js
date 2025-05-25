import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from '@/components/ui/toaster';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Trackflow",
  description: "Gest a complete overview of your orders and leads",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
          <Toaster /> 
      </body>
    </html>
  );
}
