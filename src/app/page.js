export const metadata = {
  metadataBase: new URL('https://prize-wise.vercel.app'),
  title: "E-commerce Price Tracker | Track Amazon & Flipkart Prices, Get Price Drop Alerts",
  description: "Track product prices and get notified when they drop. Supports Flipkart, Amazon, and other major e-commerce sites.",
  keywords: "price tracker, e-commerce, price monitoring, price alerts, online shopping, track Amazon prices, Flipkart price tracker, price drop notification, deal alerts",
  openGraph: {
    title: "E-commerce Price Tracker | Track Amazon & Flipkart Prices, Get Price Drop Alerts",
    description: "Track product prices and get notified when they drop. Supports Flipkart, Amazon, and other major e-commerce sites.",
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
    description: "Track product prices and get notified when they drop. Supports Flipkart, Amazon, and other major e-commerce sites.",
    site: "@manishtochand",
    creator: "@manishtochand",
    images: [
      {
        url: "/public/globe.svg",
        alt: "E-commerce Price Tracker Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://prize-wise.vercel.app/",
  },
};

import HomeClient from './HomeClient';

export default function HomePage() {
  return <HomeClient />;
}


