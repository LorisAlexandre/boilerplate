import { signOut } from "next-auth/react";
import { Button } from "@/components/shadcn-ui";

export const LogoutButton = () => {
  return <Button onClick={() => signOut()}>Se déconnecter</Button>;
};
