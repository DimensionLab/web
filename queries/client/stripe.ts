import { useGetToken } from "@/hooks/useGetToken";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useQuery } from "@tanstack/react-query";

export function useQueryStripeCustomerCredits() {
  const { data: accessToken } = useGetToken();
  const { user } = useUser();
  const customer_id = user?.customer_id as string;

  return useQuery({
    queryKey: ["stripeCustomerCredits", customer_id],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/billing/credits?customer_id=${customer_id}`, {
        next: { revalidate: 60}
      })
    
      if (!response.ok) {
        throw new Error("There was an error fetching customer data.")
      }
      const data = await response.json();
    
      return data as { credits: number };
    },
    enabled: !!accessToken && !!customer_id
  })
}

export function useQuerySubscriptionsPricesList() {
  const { data: accessToken } = useGetToken();

  return useQuery({
    queryKey: ["subscriptionsPricesList"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/billing/price-search/?query=active:'true' AND metadata['main_subscription']:'true'`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        throw new Error("There was an error fetching subscriptions prices.");
      }
      const data = await res.json();
    
      return data as Record<string, any>;
    },
    enabled: !!accessToken
  })
}

export function useQuerySubscription() {
  const { data: accessToken } = useGetToken();
  const { user } = useUser();
  const customer_id = user?.customer_id as string;

  return useQuery({
    queryKey: ["subscription", customer_id],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/billing/subscriptions/${customer_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        next: { revalidate: 60}
      });
    
      if (!response.ok) {
        throw new Error("There was an error fetching subscription.")
      }
    
      return response.json();
    },
    enabled: (accessToken && customer_id) ? true : false
  })
}