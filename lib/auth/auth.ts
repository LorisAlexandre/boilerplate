import { JWTPayload, SignJWT, jwtVerify } from "jose";
import bcrypt from "bcrypt";

import { cookies } from "next/headers";

import { prisma } from "@/lib/db";
import { User } from "@prisma/client";

const KEY = new TextEncoder().encode(process.env.AUTH_SECRET_KEY);
export interface Session extends JWTPayload {
  user: {
    email: User["email"];
    id: User["id"];
    name: User["name"] | null;
    plan: User["plan"];
  };
  expires: Date;
}

export async function encrypt(payload: any, expires?: string): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expires ?? "7h")
    .sign(KEY);
}

export async function decrypt(input: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(input, KEY, {
    algorithms: ["HS256"],
  });

  return payload;
}

export async function updateSession(): Promise<void> {
  const session = cookies().get("lorisSession")?.value;
  if (!session) return;

  // session update
  const parsed = await decrypt(session);
  const expires = new Date(Date.now() + 3 * 60 * 60 * 1000);
  const newSessionToken = await encrypt(parsed);

  // update db session
  await prisma.session.update({
    where: {
      sessionToken: session,
    },
    data: {
      expires,
      sessionToken: newSessionToken,
    },
  });

  // give db session to cookies
  cookies().set({
    name: "lorisSession",
    value: newSessionToken,
    httpOnly: true,
    expires,
  });
}

export async function getSession(): Promise<Session | null> {
  const session = cookies().get("lorisSession")?.value;
  if (!session) return null;

  return (await decrypt(session)) as unknown as Session;
}

export async function logout() {
  const sessionToken = cookies().get("lorisSession")?.value;
  if (!sessionToken) return;

  cookies().set("lorisSession", "", { expires: new Date(0) });

  await prisma.session.delete({
    where: {
      sessionToken,
    },
  });
}

export async function login(formData: FormData) {
  const { email, password } = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const user = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
  });

  if (!user) throw new Error("404 user not found");
  if (!bcrypt.compareSync(password as string, user.password))
    throw new Error("401 bad credentials");

  // session creation
  const expires = new Date(Date.now() + 7 * 60 * 60 * 1000);
  const sessionToken = await encrypt({
    user: {
      email: user.email,
      name: user.name,
      id: user.id,
      plan: user.plan,
    },
    expires,
  } satisfies Session);

  // create db session
  await prisma.session.create({
    data: {
      sessionToken,
      expires,
      userId: user.id,
    },
  });

  // give session to db and cookies
  cookies().set("lorisSession", sessionToken, {
    expires,
    httpOnly: true,
  });
}
