"use client";
import BottomNavBar from "@/components/common/bottomNavBar";
import PolicyCoverageUI from "@/components/policy-coverage/policyCoverageUI";
import React, { useState } from "react";

type Props = {};

const PolicyCoverageContainer = (props: Props) => {
  const [policy, setPolicy] = useState({
    hours: 12,
    limit: 15000,
  });

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

  function onPolicyChange(name: "hours" | "limit", value: number) {
    setPolicy((prevPolicy) => ({
      ...prevPolicy,
      [name]: value,
    }));
  }

  return (
    <div  className="pb-24">
      <PolicyCoverageUI
        coverageLimitOpts={coverageLimitOpts}
        coverageHourOpts={coverageHourOpts}
        policy={policy}
        onPolicyChange={onPolicyChange}
      />
      <BottomNavBar buttonLabel="Next: Business Information" />
    </div>
  );
};

export default PolicyCoverageContainer;
