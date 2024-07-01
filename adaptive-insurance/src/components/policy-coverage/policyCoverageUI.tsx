import React from "react";
import HourCoverage from "./hourCoverage";
import CoverageLimit from "./coverageLimit";
import QuoteCard from "./quoteCard";

type Props = {
  policy: { hours: number; limit: number };
  coverageLimitOpts: Array<{ limit: number }>;
  coverageHourOpts: Array<{ hours: number; text: string }>;
  onPolicyChange: (name: "hours" | "limit", value: number) => void;
};

const PolicyCoverageUI = (props: Props) => {
  return (
    <div className="flex w-full h-full px-10 py-12">
      <div className="mr-auto md:pr-10 lg:px-32">
        <div className="md:hidden">
          <QuoteCard policy={props.policy} />
        </div>
        <div className="w-full border border-white border-t-gray my-16 md:hidden"></div>
        <HourCoverage
          coverageHourOpts={props.coverageHourOpts}
          selectedHours={props.policy.hours}
          onPolicyHoursChange={(value: number) =>
            props.onPolicyChange("hours", value)
          }
        />
        <CoverageLimit
          selectedLimit={props.policy.limit}
          coverageLimitOpts={props.coverageLimitOpts}
          onPolicyLimitChange={(value: number) =>
            props.onPolicyChange("limit", value)
          }
        />
        <p className="font-bold underline cursor-pointer">
          See what this means
        </p>
      </div>
      <div className="w-96 grow-0 shrink-0 hidden md:block">
        <div className="fixed right-10">
          <QuoteCard policy={props.policy} />
        </div>
      </div>
    </div>
  );
};

export default PolicyCoverageUI;
