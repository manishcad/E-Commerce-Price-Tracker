// lib/scrape.js
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function getPriceFromUrl(url) {
  try {
    // Validate URL
    if (!url || !url.startsWith('http')) {
      throw new Error('Invalid URL provided');
    }

    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(data);

    // Multiple selectors for different e-commerce sites
    const priceSelectors = [
      // Flipkart
      '._30jeq3._16Jk6d',
      '._1vC4OE._3qQ9m1',
      '[data-id="price"]',
      
      // Amazon
      '.a-price-whole',
      '.a-price .a-offscreen',
      '#priceblock_ourprice',
      '#priceblock_dealprice',
      
      // General selectors
      '.price',
      '[class*="price"]',
      '[data-price]',
      '.product-price',
      '.current-price',
      
      // JSON-LD structured data
      'script[type="application/ld+json"]'
    ];

    let price = null;

    // Try structured data first
    $('script[type="application/ld+json"]').each((i, el) => {
      try {
        const jsonData = JSON.parse($(el).html());
        if (jsonData.offers && jsonData.offers.price) {
          price = parseFloat(jsonData.offers.price);
        }
      } catch (e) {
        // Ignore JSON parse errors
      }
    });

    // If no structured data, try selectors
    if (!price) {
      for (const selector of priceSelectors) {
        const priceElement = $(selector).first();
        if (priceElement.length > 0) {
          const priceText = priceElement.text().trim();
          const cleanPrice = parseFloat(priceText.replace(/[₹,₹$€£]/g, ''));
          if (!isNaN(cleanPrice) && cleanPrice > 0) {
            price = cleanPrice;
            break;
          }
        }
      }
    }

    if (!price || isNaN(price) || price <= 0) {
      throw new Error('Price not found on the page');
    }

    return price;
  } catch (err) {
    console.error('Error scraping price from URL:', err.message);
    return null;
  }
}
