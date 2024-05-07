import { sendVerificationRequest } from "@/lib/resend";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Stripe.Event;

  switch (body.type) {
    case "checkout.session.completed": {
      const session = body.data.object as Stripe.Checkout.Session;

      await prisma.user.create({
        data: {
          email: session.customer_details?.email ?? "",
          name: session.customer_details?.name ?? "",
          password: "",
        },
      });

      sendVerificationRequest({
        email: session.customer_details?.email ?? "",
        name: session.customer_details?.name ?? "",
      });

      break;
    }
    // ajouter d'autres events cf https://dashboard.stripe.com/test/webhooks
    default: {
      console.log("Unhandled event type", body.type);
    }
  }

  return NextResponse.json({
    result: true,
  });
}
