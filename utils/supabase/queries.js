import { cache } from "react";
import config, { defaultFeatureFlags } from "@/config";

export const getUser = cache(async (supabase) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export const getSubscription = cache(async (supabase) => {
  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .in("status", ["trialing", "active"])
    .maybeSingle();

  return subscription;
});

export const getProducts = cache(async (supabase) => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { referencedTable: "prices" });

  return products;
});

export const getUserDetails = cache(async (supabase) => {
  const { data: userDetails } = await supabase
    .from("users")
    .select("*")
    .single();
  return userDetails;
});

export const getActiveSubscriptionFeatureFlags = cache((subscription) => {
  if (!subscription) {
    return defaultFeatureFlags;
  }

  const activeProdId = subscription.prices.product_id;

  const activePlan = config.stripe.plans.find(
    (plan) => plan.prodId === activeProdId,
  );

  return activePlan ? activePlan.flags : defaultFeatureFlags;
});
