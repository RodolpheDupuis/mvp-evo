// lib/payments.ts
import * as stripe from "@/lib/stripe";
import * as lemonsqueezy from "@/lib/lemonsqueezy";

/**
 * Hook to get the appropriate payment processor based on environment variables
 * This is used on the client side, so we read from NEXT_PUBLIC_ variables
 */
export const usePayments = () => {
  // In a real application, you might want to use React's useState and useEffect
  // to dynamically change this based on user preferences or other factors
  
  // For now, we'll just read from the environment variable
  if (typeof window !== 'undefined') {
    // We're on the client side
    if (process.env.NEXT_PUBLIC_USE_STRIPE === "true") {
      console.log("Using Stripe for payments");
      return stripe;
    } else {
      console.log("Using LemonSqueezy for payments");
      return lemonsqueezy;
    }
  } else {
    // We're on the server side (during SSR)
    // Default to Stripe for server-side rendering
    return stripe;
  }
};