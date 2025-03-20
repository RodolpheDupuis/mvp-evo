// app/checkout/page.tsx
"use client";
import { useState } from "react";
import { Button } from "@/app/[locale]/components/ui/button";
import { usePayments } from "@/lib/payments";
import { useLocale } from "next-intl";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const { createCheckoutSession } = usePayments();
  const locale = useLocale();

  const handlePurchase = async () => {
    setLoading(true);
    try {
      // For Stripe, we use the product ID (which gets converted to a price ID)
      // For LemonSqueezy, we need to provide a product ID and optionally a variant ID
      const productId = "prod_RybscS5sn5GGaB"; // Your Stripe product ID
      const lemonSqueezyVariantId = "732122"; // Replace with your actual LemonSqueezy variant ID
      
      // The createCheckoutSession function is smart enough to handle both cases
      const session = await createCheckoutSession(
        productId, 
        locale,
        process.env.NEXT_PUBLIC_USE_STRIPE !== "true" ? lemonSqueezyVariantId : undefined
      );
      
      if (session && session.url) {
        window.location.href = session.url;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Purchase Access</h1>
      <Button onClick={handlePurchase} disabled={loading}>
        {loading ? "Processing..." : "Buy Now"}
      </Button>
    </div>
  );
}
