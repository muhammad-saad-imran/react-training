import React from "react";
import styled from "styled-components";

type Props = {
  coverageLimitOpts: Array<{ limit: number }>;
  selectedLimit: number;
  onPolicyLimitChange: (value: number) => void;
};

const CoverageLimit = (props: Props) => {
  return (
    <>
      <p className="text-5xl text-center md:text-left">
        Now, select your coverage limit
      </p>
      <p className="my-6 text-center md:text-left">
        Should your business lose power for 12 hours, how much would you need to
        cover operations?
      </p>

      <CoverageCardContainer>
        {props.coverageLimitOpts.map((coverage, index) => (
          <CoverageLimitCard
            key={index}
            selectedLimit={props.selectedLimit}
            limit={coverage.limit}
            onClick={() => props.onPolicyLimitChange(coverage.limit)}
          >
            <p className="font-bold md:text-xl lg:text-2xl">
              ${coverage.limit}
            </p>
          </CoverageLimitCard>
        ))}
      </CoverageCardContainer>
    </>
  );
};

const CoverageCardContainer = styled.div.attrs({
  className:
    "flex flex-wrap justify-around items-center md:justify-start md:items-start gap-8 mb-12",
})``;

const CoverageLimitCard = styled.div.attrs<{
  selectedLimit: number;
  limit: number;
}>((props) => ({
  className:
    "border rounded-lg flex flex-col justify-center items-center p-9 w-40 md:w-36 lg:w-48 cursor-pointer " +
    (props.selectedLimit === props.limit
      ? "bg-white border-deep-blue shadow-xl"
      : "border-gray text-gray"),
}))``;

export default CoverageLimit;
