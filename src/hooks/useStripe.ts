import { useCallback } from 'react';
import { products } from '@/stripe-config';
import { useSupabase } from '@/hooks/useSupabase';

export function useStripe() {
  const { supabase } = useSupabase();

  const createCheckoutSession = useCallback(async (productId: keyof typeof products) => {
    const product = products[productId];

    if (!product) {
      throw new Error(`Invalid product ID: ${productId}`);
    }

    const { data: { session_url }, error } = await supabase.functions.invoke('stripe-checkout', {
      body: {
        price_id: product.priceId,
        mode: product.mode,
        success_url: `${window.location.origin}/checkout/success`,
        cancel_url: `${window.location.origin}/checkout/cancel`,
      },
    });

    if (error) {
      throw error;
    }

    return session_url;
  }, [supabase]);

  return {
    createCheckoutSession,
  };
}