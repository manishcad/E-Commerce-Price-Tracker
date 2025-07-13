import prisma from '../../../lib/prisma';
import { getPriceFromUrl } from '../../../lib/scrape';
import nodemailer from 'nodemailer';

export async function GET(request) {
  try {
    const secret = request.headers.get('x-secret');
    if (secret !== process.env.SCHEDULER_SECRET) {
      return new Response('Unauthorized', { status: 401 });
    }

  const trackers = await prisma.trackRequest.findMany({
    where: { alertSent: false },
  });

    let processedCount = 0;
    let emailSentCount = 0;
    let errors = [];

    for (const tracker of trackers) {
      try {
        processedCount++;
        const currentPrice = await getPriceFromUrl(tracker.url);
        
        if (!currentPrice) {
          console.log(`Could not get price for ${tracker.url}`);
          continue;
        }

        if (currentPrice < tracker.price) {
          // Send email notification
          await sendPriceDropEmail(tracker, currentPrice);
          emailSentCount++;

          // Update database
          await prisma.trackRequest.update({
            where: { id: tracker.id },
            data: {
              price: currentPrice,
              alertSent: true,
              lastChecked: new Date(),
            },
          });

          console.log(`Price drop alert sent for ${tracker.url}: ₹${tracker.price} → ₹${currentPrice}`);
        } else {
          // Update last checked time
          await prisma.trackRequest.update({
            where: { id: tracker.id },
            data: { lastChecked: new Date() },
          });
        }
      } catch (error) {
        console.error(`Error processing tracker ${tracker.id}:`, error);
        errors.push(`Tracker ${tracker.id}: ${error.message}`);
      }
    }

    const summary = {
      processed: processedCount,
      emailsSent: emailSentCount,
      errors: errors.length,
      errorDetails: errors
    };

    return new Response(
      JSON.stringify(summary), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Check prices error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

async function sendPriceDropEmail(tracker, currentPrice) {
  const priceDrop = tracker.price - currentPrice;
  const savingsPercent = ((priceDrop / tracker.price) * 100).toFixed(1);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Price Drop Alert</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
        .price-info { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .old-price { text-decoration: line-through; color: #6b7280; }
        .new-price { color: #059669; font-size: 24px; font-weight: bold; }
        .savings { color: #059669; font-weight: bold; }
        .cta-button { display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 15px 0; }
        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔻 Price Drop Alert!</h1>
        </div>
        <div class="content">
          <h2>Great news! The price has dropped on a product you're tracking.</h2>
          
          <div class="price-info">
            <p><strong>Old Price:</strong> <span class="old-price">₹${tracker.price}</span></p>
            <p><strong>New Price:</strong> <span class="new-price">₹${currentPrice}</span></p>
            <p><strong>You Save:</strong> <span class="savings">₹${priceDrop} (${savingsPercent}%)</span></p>
          </div>
          
          <a href="${tracker.url}" class="cta-button" target="_blank">View Product</a>
          
          <p><small>This alert was sent automatically by your price tracker. You won't receive more alerts for this product unless you track it again.</small></p>
        </div>
        <div class="footer">
          <p>Price Tracker - Never miss a deal again!</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
🔻 Price Drop Alert!

Great news! The price has dropped on a product you're tracking.

Old Price: ₹${tracker.price}
New Price: ₹${currentPrice}
You Save: ₹${priceDrop} (${savingsPercent}%)

View Product: ${tracker.url}

This alert was sent automatically by your price tracker. You won't receive more alerts for this product unless you track it again.

---
Price Tracker - Never miss a deal again!
  `;

  await transporter.sendMail({
    from: `"Price Tracker" <${process.env.EMAIL_USER}>`,
    to: tracker.email,
    subject: `🔻 Price Dropped! Save ₹${priceDrop} on your tracked product`,
    text: textContent,
    html: htmlContent,
  });
}
