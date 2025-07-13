// lib/scrape.js
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function getPriceFromUrl(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        // Spoof headers to avoid blocks
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
      },
    });

    const $ = cheerio.load(data);

    // Example: Flipkart product price selector
    const priceText =
      $('._30jeq3._16Jk6d').first().text() || $('span.price').first().text();

    const cleanPrice = parseFloat(priceText.replace(/[₹,]/g, ''));

    if (isNaN(cleanPrice)) throw new Error('Price not found');
    return cleanPrice;
  } catch (err) {
    console.error('Error scraping:', err.message);
    return null;
  }
}
