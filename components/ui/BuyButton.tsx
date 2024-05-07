import { Button } from "@/components/shadcn-ui";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export const BuyButton = () => {
  async function createCheckoutSession() {
    "use server";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${process.env.SERV_URL}/checkEmail`,
      cancel_url: `${process.env.SERV_URL}/cancel`,
      line_items: [
        {
          price: process.env.STRIPE_PRODUCT_ID,
          quantity: 1,
        },
      ],
    });

    if (!session.url) throw new Error("session failed");

    redirect(session.url);
  }

  return (
    <form>
      <Button formAction={createCheckoutSession}>Get Product</Button>
    </form>
  );
};
