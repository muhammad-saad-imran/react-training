"use client";
import React from "react";
import QuoteCard from "../../components/policy-coverage/QuoteCard";
import { useAppSelector } from "@/lib/hooks";
import { selectPolicyCoverage } from "@/lib/feature/policy-coverage/policyCoverageSlice";

type Props = {
  children: React.ReactNode;
};

const BusinessInfoFormLayout = (props: Props) => {
  const policy = useAppSelector(selectPolicyCoverage);

  return (
    <div className="pb-24">
      <div className="flex w-full h-full px-10 py-12">
        <div className="mr-auto md:pr-10 lg:px-32 w-full">{props.children}</div>
        <div className="w-80 lg:w-96 grow-0 shrink-0 hidden md:block">
          <div className="fixed right-10">
            <QuoteCard policy={policy} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoFormLayout;
