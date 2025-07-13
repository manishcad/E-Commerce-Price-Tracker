# 🛒 E-commerce Price Tracker

A modern web application that tracks product prices from major e-commerce sites and notifies users when prices drop.

## Features

- **Smart Price Detection**: Automatically extracts prices from product pages using advanced web scraping
- **Multi-Platform Support**: Works with Flipkart, Amazon, and other major e-commerce sites
- **Email Notifications**: Get instant alerts when prices drop on tracked products
- **Modern UI**: Beautiful, responsive design with real-time feedback
- **Privacy First**: Secure data handling with no third-party sharing

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Web Scraping**: Axios + Cheerio
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd price-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/price_tracker"
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) View your database
npx prisma studio
```

### 5. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 6. Production Build

```bash
npm run build
npm start
```

## API Endpoints

### POST `/api/track`
Create a new price tracking request.

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

### GET `/api/track?email=user@example.com`
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

## Database Schema

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

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

- `DATABASE_URL`: PostgreSQL connection string

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@example.com or create an issue in this repository.
