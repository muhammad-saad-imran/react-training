import React from "react";
import styled from "styled-components";

type Props = {
  coverageHourOpts: Array<{ hours: number; text: string }>;
  selectedHours: number;
  onPolicyHoursChange: (value: number) => void;
};

const HourCoverage = (props: Props) => {
  return (
    <>
      <Title>Based on your area, </Title>
      <Title>12-hour coverage is right for you</Title>
      <p className="my-8 text-center md:text-left">
        Brooklyn, NY is at a{" "}
        <span className="text-deep-blue inline">Medium</span> risk for
        experiencing power loss in the next 12 months. How long can your
        business go without power before requiring assistance?
      </p>

      <div className="flex flex-wrap gap-8 mb-12">
        {props.coverageHourOpts.map((coverage) => (
          <HoursCard
            selectedHours={props.selectedHours}
            hours={coverage.hours}
            onClick={() => props.onPolicyHoursChange(coverage.hours)}
          >
            <p className="font-bold text-xl lg:text-4xl mt-auto mb-auto">
              {coverage.hours} hours
            </p>
            <p className="text-center text-sm mb-auto">{coverage.text}</p>
          </HoursCard>
        ))}
      </div>
    </>
  );
};

const Title = styled.p.attrs({
  className: "text-5xl text-center md:text-left",
})``;

const HoursCard = styled.div.attrs<{ selectedHours: number; hours: number }>(
  (props) => ({
    className:
      "border rounded-lg flex flex-col items-center w-full md:size-48 lg:size-60 p-4 cursor-pointer " +
      (props.selectedHours === props.hours
        ? "bg-white border-deep-blue shadow-xl"
        : "border-gray text-gray"),
  })
)``;

export default HourCoverage;
