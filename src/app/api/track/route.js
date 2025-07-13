// app/track/route.js
import prisma from '../../../lib/prisma';
import { getPriceFromUrl } from '../../../lib/scrape';

export async function POST(request) {
  const formData = await request.formData();
  const url = formData.get('url');
  const email = formData.get('email');

  const price = await getPriceFromUrl(url);

  if (!price) {
    return new Response('Failed to get price.', { status: 500 });
  }

  await prisma.trackRequest.create({
    data: {
      url,
      email,
      price,
    },
  });

  return new Response(`Tracking started at price ₹${price}`, {
    status: 200,
  });
}
