import { cache } from "react";
import config, { defaultFeatureFlags } from "@/config";
import { SupabaseClient } from "@supabase/supabase-js";

export const getUser = cache(async (supabase: SupabaseClient<any, "public", any>) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export const getSubscription = cache(async (supabase: SupabaseClient<any, "public", any>) => {
  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .in("status", ["trialing", "active"])
    .maybeSingle();

  return subscription;
});

export const getProducts = cache(async (supabase: SupabaseClient<any, "public", any>) => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { referencedTable: "prices" });

  return products;
});

export const getUserDetails = cache(async (supabase: SupabaseClient<any, "public", any>) => {
  const { data: userDetails } = await supabase
    .from("users")
    .select("*")
    .single();
  return userDetails;
});

// TODO: Either remove if not used or implement the plan storing in the database
// export const getActiveSubscriptionFeatureFlags = cache(
//   (subscription: any) => {
//     if (!subscription) {
//       return defaultFeatureFlags;
//   }

//   const activeProdId = subscription.prices.product_id;

//   const activePlan = config.stripe.plans.find(
//     (plan) => plan.prodId === activeProdId,
//   );

//   return activePlan ? activePlan.flags : defaultFeatureFlags;
// });
