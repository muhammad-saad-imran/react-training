import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  changeCoverageAmount,
  changeSelectedQuoteId,
  selectPolicyCoverage,
} from "@/store/feature/policy-coverage";
import { HorizontalLine, PageWrapper, QuoteCardWrapper } from "./style";
import HourCoverage from "./HourCoverage";
import CoverageLimit from "./CoverageLimit";
import QuoteCard from "./QuoteCard";
import { policyCoverageConfig } from "@/config/policyCoverageConfig";

type Props = {
  onShowModal: () => void;
};

const PolicyCoverageUI = (props: Props) => {
  const dispatch = useAppDispatch();
  const policy = useAppSelector(selectPolicyCoverage);
  return (
    <PageWrapper>
      <div className="mr-auto md:pr-10 lg:px-32">
        <div className="md:hidden">
          <QuoteCard />
          <HorizontalLine className="my-16" />
        </div>
        <HourCoverage
          coverageQuotes={policy.quoteEstimates}
          selectedQuoteId={policy.selectedEstimateId}
          onPolicyQuoteChange={(value: string) =>
            dispatch(changeSelectedQuoteId(value))
          }
        />
        <CoverageLimit
          selectedLimit={policy.amount}
          coverageLimitOpts={policyCoverageConfig.coverageLimitOpts}
          onPolicyLimitChange={(value: number) =>
            dispatch(changeCoverageAmount(value))
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
