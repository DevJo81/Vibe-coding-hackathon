import { useEffect, useState } from 'react';
import { useSupabase } from '@/hooks/useSupabase';

export function useSubscription() {
  const { supabase, user } = useSupabase();
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function getSubscription() {
      try {
        const { data, error } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .maybeSingle();

        if (error) {
          throw error;
        }

        setSubscription(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getSubscription();
  }, [user, supabase]);

  return { subscription, loading, error };
}