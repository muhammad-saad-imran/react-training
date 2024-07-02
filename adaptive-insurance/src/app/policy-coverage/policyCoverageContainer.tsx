"use client";
import BottomNavBar from "@/components/common/BottomNavBar";
import InstructionModal from "@/components/policy-coverage/InstructionModal";
import PolicyCoverageUI from "@/components/policy-coverage/PolicyCoverageUI";
import { selectPolicyCoverage } from "@/lib/feature/policy-coverage/policyCoverageSlice";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const PolicyCoverageContainer = (props: Props) => {
  const policy = useAppSelector(selectPolicyCoverage);

  const [isModelHidden, setIsModelHidden] = useState(true);

  const router = useRouter();

  const coverageHourOpts = [
    {
      hours: 8,
      text: "For businesses that need coverage quickly (cafes, grocery stores, etc.)",
    },
    {
      hours: 12,
      text: "For businesses that can last the night before needing coverage (retail stores, etc.)",
    },
    {
      hours: 16,
      text: "For businesses that can go a full day without power (retail that has an online store, etc.)",
    },
  ];

  const coverageLimitOpts = [
    {
      limit: 5000,
    },
    {
      limit: 10000,
    },
    {
      limit: 15000,
    },
    {
      limit: 20000,
    },
  ];

  return (
    <div className="pb-24">
      <PolicyCoverageUI
        coverageLimitOpts={coverageLimitOpts}
        coverageHourOpts={coverageHourOpts}
        policy={policy}
        onShowModal={() => setIsModelHidden((prevState) => !prevState)}
      />
      <BottomNavBar
        buttonLabel="Next: Business Information"
        onButtonClick={() =>
          router.push("business-info/business-entity-details")
        }
      />
      <InstructionModal
        hide={isModelHidden}
        onCloseModal={() => setIsModelHidden(true)}
      />
    </div>
  );
};

export default PolicyCoverageContainer;
