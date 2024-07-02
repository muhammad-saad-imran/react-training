"use client"
import BusinessEntityDetailsUI from "@/components/business-entity-details/BusinessEntityDetailsUI";
import BottomNavBar from "@/components/common/BottomNavBar";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const BusinessEntityDetailContainer = (props: Props) => {
  const router = useRouter();

  return (
    <div>
      <BusinessEntityDetailsUI />
      <BottomNavBar
        buttonLabel="Next: Business Mailing Address"
        onButtonClick={() => router.push("business-mailing-address")}
      />
    </div>
  );
};

export default BusinessEntityDetailContainer;
