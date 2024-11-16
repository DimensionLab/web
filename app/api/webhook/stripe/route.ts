import { stripe } from "@/utils/stripe/config";
import {
  upsertProductRecord,
  upsertPriceRecord,
  manageSubscriptionStatusChange,
  deleteProductRecord,
  deletePriceRecord,
} from "@/utils/supabase/admin";
import { NextRequest } from "next/server";

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "product.deleted",
  "price.created",
  "price.updated",
  "price.deleted",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    if (!sig || !webhookSecret)
      return new Response("Webhook secret not found.", { status: 400 });
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`🔔  Webhook received: ${event.type}`);
  } catch (err) {
    console.log(`Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "product.created":
        case "product.updated":
          await upsertProductRecord(event.data.object);
          break;
        case "price.created":
        case "price.updated":
          await upsertPriceRecord(event.data.object);
          break;
        case "price.deleted":
          await deletePriceRecord(event.data.object);
          break;
        case "product.deleted":
          await deleteProductRecord(event.data.object);
          break;
        case "customer.subscription.created":
          {
            const subscription = event.data.object;
            await manageSubscriptionStatusChange(
              subscription.id,
              subscription.customer,
              event.type === "customer.subscription.created",
            );

            // TODO: do something
          }

          break;
        case "customer.subscription.updated":
          {
            const subscription = event.data.object;
            await manageSubscriptionStatusChange(
              subscription.id,
              subscription.customer,
              false,
            );

            // TODO: do something
          }

          break;
        case "customer.subscription.deleted":
          {
            const subscription = event.data.object;
            await manageSubscriptionStatusChange(
              subscription.id,
              subscription.customer,
              false,
            );

            // TODO: do something
          }

          break;
        case "checkout.session.completed": {
          const checkoutSession = event.data.object;
          if (checkoutSession.mode === "subscription") {
            const subscriptionId = checkoutSession.subscription;
            await manageSubscriptionStatusChange(
              subscriptionId,
              checkoutSession.customer,
              true,
            );

            // TODO: do something
          }

          break;
        }
        default:
          throw new Error("Unhandled relevant event!");
      }
    } catch (error) {
      console.log(error);
      return new Response(
        "Webhook handler failed. View your Next.js function logs.",
        {
          status: 400,
        },
      );
    }
  } else {
    return new Response(`Unsupported event type: ${event.type}`, {
      status: 400,
    });
  }
  return new Response(JSON.stringify({ received: true }));
}
