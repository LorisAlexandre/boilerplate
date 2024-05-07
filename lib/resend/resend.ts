import { Resend } from "resend";
import { MagicLink } from "@/components/emails";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationRequest({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  if (!email.trim() || !name.trim()) return;

  const data = await resend.emails.send({
    from: process.env.RESEND_FROM ?? "lorisalexandre.dev@gmail.com",
    subject: "congratulations on purchasing buildinpollcat",
    to: email,
    react: await MagicLink({ name, email }),
  });

  console.log(data);
}
