import React from "react";
import HourCoverage from "./HourCoverage";
import CoverageLimit from "./CoverageLimit";
import QuoteCard from "./QuoteCard";
import { useAppDispatch } from "@/lib/hooks";
import {
  changeCoverageHours,
  changeCoverageLimit,
} from "@/lib/feature/policy-coverage/policyCoverageSlice";
import styled from "styled-components";

type Props = {
  policy: { hours: number; limit: number };
  coverageLimitOpts: Array<{ limit: number }>;
  coverageHourOpts: Array<{ hours: number; text: string }>;
  onShowModal: () => void;
};

const PolicyCoverageUI = (props: Props) => {
  const dispatch = useAppDispatch();
  return (
    <Wrapper>
      <div className="mr-auto md:pr-10 lg:px-32">
        <div className="md:hidden">
          <QuoteCard policy={props.policy} />
        </div>
        <HorizontalLine />
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
    </Wrapper>
  );
};

const Wrapper = styled.div.attrs({
  className: "flex w-full h-full px-10 py-12",
})``;

const HorizontalLine = styled.div.attrs({
  className: "w-full border border-white border-t-gray my-16 md:hidden",
})``;

const QuoteCardWrapper = styled.div.attrs({
  className: "w-80 lg:w-96 grow-0 shrink-0 hidden md:block",
})``;

export default PolicyCoverageUI;
