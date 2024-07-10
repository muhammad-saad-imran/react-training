import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  changeCoverageHours,
  changeCoverageLimit,
  selectPolicyCoverage,
} from "@/store/feature/policy-coverage";
import { HorizontalLine, PageWrapper, QuoteCardWrapper } from "./style";
import HourCoverage from "./HourCoverage";
import CoverageLimit from "./CoverageLimit";
import QuoteCard from "./QuoteCard";

type Props = {
  coverageLimitOpts: Array<{ limit: number }>;
  coverageHourOpts: Array<{ hours: number; text: string }>;
  onShowModal: () => void;
};

const PolicyCoverageUI = (props: Props) => {
  const dispatch = useAppDispatch();
  const policy = useAppSelector(selectPolicyCoverage)
  return (
    <PageWrapper>
      <div className="mr-auto md:pr-10 lg:px-32">
        <div className="md:hidden">
          <QuoteCard />
          <HorizontalLine className="my-16" />
        </div>
        <HourCoverage
          coverageHourOpts={props.coverageHourOpts}
          selectedHours={policy.hours}
          onPolicyHoursChange={(value: number) =>
            dispatch(changeCoverageHours(value))
          }
        />
        <CoverageLimit
          selectedLimit={policy.limit}
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
          <QuoteCard />
        </div>
      </QuoteCardWrapper>
    </PageWrapper>
  );
};

export default PolicyCoverageUI;
