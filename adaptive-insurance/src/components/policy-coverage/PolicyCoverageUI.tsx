import React from "react";
import HourCoverage from "./HourCoverage";
import CoverageLimit from "./CoverageLimit";
import QuoteCard from "./QuoteCard";
import { useAppDispatch } from "@/store/hooks";
import {
  changeCoverageHours,
  changeCoverageLimit,
} from "@/store/feature/policy-coverage";
import { HorizontalLine, PageWrapper, QuoteCardWrapper } from "./style";

type Props = {
  policy: { hours: number; limit: number };
  coverageLimitOpts: Array<{ limit: number }>;
  coverageHourOpts: Array<{ hours: number; text: string }>;
  onShowModal: () => void;
};

const PolicyCoverageUI = (props: Props) => {
  const dispatch = useAppDispatch();
  return (
    <PageWrapper>
      <div className="mr-auto md:pr-10 lg:px-32">
        <div className="md:hidden">
          <QuoteCard policy={props.policy} />
          <HorizontalLine className="my-16" />
        </div>
        <HourCoverage
          coverageHourOpts={props.coverageHourOpts}
          selectedHours={props.policy.hours}
          onPolicyHoursChange={(value: number) =>
            dispatch(changeCoverageHours(value))
          }
        />
        <CoverageLimit
          selectedLimit={props.policy.limit}
          coverageLimitOpts={props.coverageLimitOpts}
          onPolicyLimitChange={(value: number) =>
            dispatch(changeCoverageLimit(value))
          }
        />
        <div>
          <p
            className="font-bold underline cursor-pointer w-fit"
            onClick={props.onShowModal}
          >
            See what this means
          </p>
        </div>
      </div>
      <QuoteCardWrapper>
        <div className="fixed right-10">
          <QuoteCard policy={props.policy} />
        </div>
      </QuoteCardWrapper>
    </PageWrapper>
  );
};

export default PolicyCoverageUI;
