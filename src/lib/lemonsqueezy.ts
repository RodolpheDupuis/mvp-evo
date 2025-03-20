// lib/lemonsqueezy.ts
// Use native fetch instead of node-fetch since we're in a Next.js environment
// which already has fetch available globally

// Define constants for LemonSqueezy
const STORE_ID = "163594"; // Replace with your actual store ID
const DEFAULT_VARIANT_ID = "732122"; // Replace with your default variant ID

export const createCheckoutSession = async (productId: string, locale: string, variantId?: string) => {
  try {
    // Use the provided variantId or fall back to the default
    const actualVariantId = variantId || DEFAULT_VARIANT_ID;
    
    // Following exactly the format from the API documentation
    const payload = {
      data: {
        type: "checkouts",
        attributes: {
          checkout_options: {
            embed: true
          },
          checkout_data: {
            custom: {
              locale: locale
            }
          },
          product_options: {
            redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/success`
          }
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: STORE_ID
            }
          },
          variant: {
            data: {
              type: "variants",
              id: actualVariantId
            }
          }
        }
      }
    };

    console.log('LemonSqueezy payload:', JSON.stringify(payload, null, 2));
    
    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.api+json",
        "Accept": "application/vnd.api+json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_LEMONSQUEEZY_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();
    console.log('LemonSqueezy response text:', responseText);
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch (e) {
        errorData = { error: responseText };
      }
      console.error('LemonSqueezy API response error:', errorData);
      throw new Error(`LemonSqueezy API error: ${JSON.stringify(errorData)}`);
    }

    const data = JSON.parse(responseText);
    console.log('LemonSqueezy checkout created:', data);
    
    // Format the response to match Stripe's format
    return {
      id: data.data?.id || 'unknown',
      url: data.data?.attributes?.url || '',
    };
  } catch (error) {
    console.error('LemonSqueezy checkout error:', error);
    throw error;
  }
};