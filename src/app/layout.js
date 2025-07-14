import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://prize-wise.vercel.app'),
  title: "E-commerce Price Tracker | Track Amazon & Flipkart Prices, Get Price Drop Alerts",
  description:
    "Track product prices and get notified when they drop. Supports Flipkart, Amazon, and other major e-commerce sites. Price tracker, price alerts, and more.",
  keywords:
    "price tracker, e-commerce, price monitoring, price alerts, online shopping, track Amazon prices, Flipkart price tracker, price drop notification, deal alerts",
  openGraph: {
    title: "E-commerce Price Tracker | Track Amazon & Flipkart Prices, Get Price Drop Alerts",
    description:
      "Track product prices and get notified when they drop. Supports Flipkart, Amazon, and other major e-commerce sites.",
    url: "https://prize-wise.vercel.app/",
    siteName: "E-commerce Price Tracker",
    images: [
      {
        url: "/public/globe.svg",
        width: 1200,
        height: 630,
        alt: "E-commerce Price Tracker Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-commerce Price Tracker | Track Amazon & Flipkart Prices, Get Price Drop Alerts",
    description:
      "Track product prices and get notified when they drop. Supports Flipkart, Amazon, and other major e-commerce sites.",
    site: "@yourtwitterhandle",
    creator: "@yourtwitterhandle",
    images: [
      {
        url: "/public/globe.svg",
        alt: "E-commerce Price Tracker Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://your-domain.com/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
