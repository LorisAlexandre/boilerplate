import { Button } from "@/components/shadcn-ui";
import { logout } from "@/lib/auth";
import { redirect } from "next/navigation";

export const LogoutButton = async () => {
  return (
    <form>
      <Button
        formAction={async () => {
          await logout();
          redirect("/");
        }}
      >
        Se déconnecter
      </Button>
    </form>
  );
};
