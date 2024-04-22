"use server";

import { auth } from "@/lib/auth";
// import { BuyButton } from "@/components/shadcn-ui";

export const Herobanner = async () => {
  const session = await auth();

  return (
    <div className="mt-10 flex flex-col gap-10 justify-center items-center">
      <h2 className="uppercase font-bold text-4xl text-center">
        Grosse phrase d'accroche C'est TROP BIEN !!
      </h2>
      <p className="text-center font-medium">
        Petit baseline qui explique pourquoi c'est trop bien, parce que tout est
        ici !
      </p>
      {/* <BuyButton session={session} text="propulse tes coachings 🚀🌑" /> */}
    </div>
  );
};
