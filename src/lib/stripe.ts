// lib/stripe.ts
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
});

export const createCheckoutSession = async (idInput: string, locale: string, _variantId?: string) => {
  try {
    // Check if the ID is a product ID (starts with 'prod_')
    if (idInput.startsWith('prod_')) {
      // Fetch prices for this product
      const prices = await stripe.prices.list({
        product: idInput,
        active: true,
        limit: 1,
      });
      
      if (prices.data.length === 0) {
        throw new Error(`No active prices found for product: ${idInput}`);
      }
      
      // Use the first active price
      const priceId = prices.data[0].id;
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/cancel`,
      });
      
      return session;
    } else {
      // Assume it's already a price ID
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{ price: idInput, quantity: 1 }],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/cancel`,
      });
      
      return session;
    }
  } catch (error) {
    console.error('Stripe checkout error:', error);
    throw error;
  }
};