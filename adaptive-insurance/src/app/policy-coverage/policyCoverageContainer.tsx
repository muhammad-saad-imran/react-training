"use client";
import BottomNavBar from "@/components/common/BottomNavBar";
import InstructionModal from "@/components/policy-coverage/InstructionModal";
import PolicyCoverageUI from "@/components/policy-coverage/PolicyCoverageUI";
import { policyCoverageConfig } from "@/config/policyCoverageConfig";
import { selectPolicyCoverage } from "@/store/feature/policy-coverage/hooks";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const PolicyCoverageContainer = (props: Props) => {
  const policy = useAppSelector(selectPolicyCoverage);

  const [isModelHidden, setIsModelHidden] = useState(true);

  const router = useRouter();

  return (
    <div className="pb-24">
      <PolicyCoverageUI
        coverageLimitOpts={policyCoverageConfig.coverageLimitOpts}
        coverageHourOpts={policyCoverageConfig.coverageHourOpts}
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
