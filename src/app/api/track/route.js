// app/track/route.js
import prisma from '../../../lib/prisma';
import { getPriceFromUrl } from '../../../lib/scrape';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return new Response(
        JSON.stringify({ 
          error: 'Email parameter is required' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const tracks = await prisma.trackRequest.findMany({
      where: { email },
      orderBy: { lastChecked: 'desc' },
    });

    return new Response(
      JSON.stringify({ tracks }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An error occurred while fetching tracking data' 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const url = formData.get('url');
    const email = formData.get('email');

    // Validate inputs
    if (!url || !email) {
      return new Response(
        JSON.stringify({ 
          error: 'URL and email are required' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          error: 'Please provide a valid email address' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate URL format
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return new Response(
        JSON.stringify({ 
          error: 'Please provide a valid URL starting with http:// or https://' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Get price from URL
    const price = await getPriceFromUrl(url);

    if (!price) {
      return new Response(
        JSON.stringify({ 
          error: 'Could not extract price from the provided URL. Please make sure it\'s a valid product page.' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if already tracking this URL for this email
    const existingTrack = await prisma.trackRequest.findFirst({
      where: {
        url: url,
        email: email,
      },
    });

    if (existingTrack) {
      return new Response(
        JSON.stringify({ 
          error: 'You are already tracking this product. We\'ll notify you when the price changes.' 
        }), 
        { 
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Create tracking request
    await prisma.trackRequest.create({
      data: {
        url,
        email,
        price,
      },
    });

    return new Response(
      JSON.stringify({ 
        success: true,
        message: `Price tracking started! Current price: ₹${price}`,
        price: price
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An error occurred while processing your request. Please try again.' 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
