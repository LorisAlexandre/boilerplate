import { prisma } from "@/lib/db";
import { Gift, Star } from "lucide-react";
import { ProfilIcons } from "./ProfilIcons";

export const Customers = async () => {
  // const customers = await prisma.user.findMany({
  //   where: {
  //     plan: "Coach",
  //   },
  //   select: {
  //     plan: true,
  //     image: true,
  //   },
  // });

  const MAX_CUSTOMERS = 50;

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <div className="flex gap-1 items-start justify-center">
        <Gift color="#4FA201" size={30} />
        <p className="w-[70%]">
          <span className="text-[#4FA201] font-bold text-lg">- 50%</span> pour
          les {MAX_CUSTOMERS} premiers seulement! (plus que {MAX_CUSTOMERS})
        </p>
      </div>
      <div className="flex gap-1 items-center justify-center">
        {/* <ProfilIcons customers={customers} /> */}
        <div>
          <div className="flex">
            <Star size={20} color="#F5AF00" fill="#F5AF00" />
            <Star size={20} color="#F5AF00" fill="#F5AF00" />
            <Star size={20} color="#F5AF00" fill="#F5AF00" />
            <Star size={20} color="#F5AF00" fill="#F5AF00" />
            <Star size={20} color="#F5AF00" fill="#F5AF00" />
          </div>
          <p className="text-xs">
            {MAX_CUSTOMERS} coachs sont passés au niveau supérieur
          </p>
        </div>
      </div>
    </div>
  );
};
