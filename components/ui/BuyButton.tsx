"use client";

import { useRouter } from "next/navigation";
import { Button, ToastAction, useToast } from "@/components/shadcn-ui";
import { stripe } from "@/lib/stripe";
import { Session } from "next-auth";
import Link from "next/link";

export const BuyButton = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleCheckoutSession = async () => {
    const user = session?.user;

    if (!user) {
      toast({
        title: "You're not connected",
        action: (
          <ToastAction altText="Go to login page">
            <Link href={"/auth/login"}>Login</Link>
          </ToastAction>
        ),
      });
      return;
    }

    const customerId = user?.stripeCustomerId;

    if (!customerId) {
      throw new Error("No customer Id");
    }

    const stripeSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${process.env.SERV_URL}/success`,
      cancel_url: `${process.env.SERV_URL}`,
      line_items: [
        {
          price: process.env.STRIPE_PRODUCT_ID,
          quantity: 1,
        },
      ],
      discounts: [
        {
          coupon: process.env.STRIPE_PROMO_ID,
        },
      ],
    });

    if (!stripeSession.url) {
      throw new Error("No session created try later");
    }

    router.push(stripeSession.url);
  };

  return <Button onClick={handleCheckoutSession}>Get Product</Button>;
};
