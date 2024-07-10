"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { policyCoverageConfig } from "@/config/policyCoverageConfig";
import BottomNavBar from "@/components/common/BottomNavBar";
import InstructionModal from "@/components/policy-coverage/InstructionModal";
import PolicyCoverageUI from "@/components/policy-coverage/PolicyCoverageUI";

type Props = {};

const PolicyCoveragePage = (props: Props) => {
  const [isModelHidden, setIsModelHidden] = useState(true);

  const router = useRouter();

  return (
    <div className="pb-24">
      <PolicyCoverageUI
        coverageLimitOpts={policyCoverageConfig.coverageLimitOpts}
        coverageHourOpts={policyCoverageConfig.coverageHourOpts}
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

export default PolicyCoveragePage;
