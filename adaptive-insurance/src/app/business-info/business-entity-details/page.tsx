"use client";
import BottomNavBar from "@/components/common/BottomNavBar";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();

  return (
    <div>
      Business Entity Details
      <BottomNavBar
        buttonLabel="Next: Business Mailing"
        onButtonClick={() => router.push("business-mailing-address")}
      />
    </div>
  );
};

export default Page;
