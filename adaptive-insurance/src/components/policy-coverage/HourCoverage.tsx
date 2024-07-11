import React from "react";
import map from "lodash/map";
import { HoursCard, Title } from "./style";

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
        {map(props.coverageHourOpts, (coverage: any, index: number) => (
          <HoursCard
            key={index}
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

export default HourCoverage;
