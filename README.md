# 🛒 E-commerce Price Tracker

<p align="center">
  <img src="public/globe.svg" width="80" alt="E-commerce Price Tracker Logo" />
</p>

<p align="center">
  <b>Track product prices from Amazon, Flipkart, and more. Get instant price drop alerts and never miss a deal again!</b>
</p>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-15-blue?logo=nextdotjs" alt="Next.js" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-2DD4BF?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" /></a>
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel" alt="Vercel" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License" /></a>
</p>

---

## 📝 Project Overview

**E-commerce Price Tracker** is a modern, open-source web application that helps you track product prices from major e-commerce sites like Amazon and Flipkart. Receive instant email notifications when prices drop, so you can save money and never miss a deal. Built with Next.js, React, and Prisma, this app is perfect for bargain hunters, deal finders, and anyone who wants to automate price tracking.

---

## ✨ Key Features

<table>
  <tr>
    <td>🤖 <b>Smart Price Detection</b></td>
    <td>Automatically extracts and tracks prices from product pages using advanced web scraping for Amazon, Flipkart, and more.</td>
  </tr>
  <tr>
    <td>🌐 <b>Multi-Platform Support</b></td>
    <td>Works with all major e-commerce sites. Track Amazon prices, Flipkart deals, and more in one place.</td>
  </tr>
  <tr>
    <td>📧 <b>Email Notifications</b></td>
    <td>Get instant price drop alerts for your tracked products, directly to your inbox.</td>
  </tr>
  <tr>
    <td>💎 <b>Modern UI</b></td>
    <td>Beautiful, responsive design with real-time feedback and seamless user experience.</td>
  </tr>
  <tr>
    <td>🔒 <b>Privacy First</b></td>
    <td>Secure data handling. Your information is never shared with third parties.</td>
  </tr>
</table>

---

## 🚀 Quick Start Guide

Follow these steps to set up your own e-commerce price tracker and start tracking Amazon prices, Flipkart deals, and more:

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd price-tracker

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database credentials

# 4. Set up the database
npx prisma generate
npx prisma db push

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,tailwind,postgres,prisma,vercel,cheerio,axios,nodejs" height="48" alt="Tech stack: Next.js, React, Tailwind CSS, PostgreSQL, Prisma, Vercel, Cheerio, Axios, Node.js" />
</p>

- **Frontend:** [Next.js 15](https://nextjs.org/), [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend:** Next.js API Routes
- **Database:** [PostgreSQL](https://www.postgresql.org/) + [Prisma ORM](https://www.prisma.io/)
- **Web Scraping:** [Axios](https://axios-http.com/) + [Cheerio](https://cheerio.js.org/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 📦 API Endpoints

### <code>POST /api/track</code> — Start Tracking a Product
Create a new price tracking request for any e-commerce product (Amazon, Flipkart, etc.).

**Form Data:**
- `url` (required): Product URL
- `email` (required): Email address for notifications

**Response:**
```json
{
  "success": true,
  "message": "Price tracking started! Current price: ₹999",
  "price": 999
}
```

---

### <code>GET /api/track?email=user@example.com</code> — View Tracked Products
Get all tracking requests for an email address.

**Response:**
```json
{
  "tracks": [
    {
      "id": "clx123",
      "url": "https://flipkart.com/product",
      "email": "user@example.com",
      "price": 999,
      "lastChecked": "2024-01-01T00:00:00Z",
      "alertSent": false
    }
  ]
}
```

---

## 🗄️ Database Schema

```prisma
model TrackRequest {
  id          String   @id @default(cuid())
  url         String
  email       String
  price       Float
  lastChecked DateTime @default(now())
  alertSent   Boolean  @default(false)
}
```

---

## 🌍 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string

---

## ❓ Why Use E-commerce Price Tracker?

- **Save Money:** Get notified instantly when prices drop on Amazon, Flipkart, and other e-commerce sites.
- **Automate Price Tracking:** No more manual checking—track unlimited products and receive alerts automatically.
- **Open Source & Free:** 100% open source, privacy-focused, and free to use.
- **Easy to Deploy:** Deploy on Vercel or your own server in minutes.

---

## 🙋 FAQ

**Q: Which e-commerce sites are supported?**  
A: Amazon, Flipkart, and most major e-commerce platforms.

**Q: How do I get price drop alerts?**  
A: Enter the product URL and your email. You’ll get notified as soon as the price drops.

**Q: Is my data safe?**  
A: Yes! Your data is never shared with third parties.

**Q: Can I contribute?**  
A: Absolutely! See the contributing section below.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 💬 Support

For support, email <a href="mailto:support@example.com">support@example.com</a> or create an issue in this repository.

---

## 1. `⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images`

**What it means:**  
Next.js uses the `metadataBase` property to generate absolute URLs for Open Graph and Twitter images. If you don’t set it, it defaults to `http://localhost:3000` in development.

**How to fix:**  
Add a `metadataBase` property to your `metadata` export in both `layout.js` and `page.js` (or wherever you export metadata).

**Example:**
```js
<code_block_to_apply_changes_from>
import { Metadata } from 'next';

export const metadata = {
  metadataBase: new URL('https://prize-wise.vercel.app'), // <-- your production URL
  // ...rest of your metadata
};
```
Add this to both `src/app/layout.js` and `src/app/page.js` metadata exports.

---

## 2. `GET /manifest.json 404 in 31ms`

**What it means:**  
Your layout references a web manifest (`<link rel="manifest" href="/manifest.json" />`), but the file does not exist.

**How to fix:**  
Create a `public/manifest.json` file in your project root.

**Example `public/manifest.json`:**
```json
{
  "name": "E-commerce Price Tracker",
  "short_name": "PriceTracker",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#18181b",
  "theme_color": "#18181b",
  "description": "Track product prices and get notified when they drop.",
  "icons": [
    {
      "src": "/favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ]
}
```

---

## 3. `Fast Refresh had to perform a full reload due to a runtime error.`

**What it means:**  
This is usually a one-time message after a code change or error. If you’re not seeing any errors in the browser, you can ignore it.

---

## ✅ Summary of Actions

1. Add `metadataBase` to your metadata exports.
2. Create `public/manifest.json`.

Would you like me to make these changes for you?
