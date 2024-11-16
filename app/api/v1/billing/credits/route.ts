import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/utils/stripe/config";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import Stripe from "stripe";

const GET = withApiAuthRequired(async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get("customer_id");

  try {
    if (!customerId) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    // Retrieve customer data from Stripe
    const customerData = (await stripe.customers.retrieve(
      customerId
    )) as Stripe.Customer;

    return NextResponse.json({
      credits: customerData.metadata?.available_credit,
    });
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        {
          error: `Error while retrieving Stripe customer data for ${customerId} - ${error.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});

export { GET };
