import React from "react";

type Props = {
  coverageHourOpts: Array<{ hours: number; text: string }>;
  selectedHours: number;
  onPolicyHoursChange: (value: number) => void;
};

const HourCoverage = (props: Props) => {
  return (
    <div>
      <p className="text-5xl text-center md:text-left">Based on your area, </p>
      <p className="text-5xl text-center md:text-left">12-hour coverage is right for you</p>
      <p className="my-8 text-center md:text-left">
        Brooklyn, NY is at a{" "}
        <span className="text-deep-blue inline">Medium</span> risk for
        experiencing power loss in the next 12 months. How long can your
        business go without power before requiring assistance?
      </p>

      <div className="flex flex-wrap gap-8 mb-12">
        {props.coverageHourOpts.map((coverage) => (
          <div
            className={
              "border rounded-lg flex flex-col items-center w-full md:size-48 lg:size-60 p-4 cursor-pointer " +
              (props.selectedHours === coverage.hours
                ? "bg-white border-deep-blue shadow-xl"
                : "border-gray text-gray")
            }
            onClick={() => props.onPolicyHoursChange(coverage.hours)}
          >
            <p className="font-bold text-xl lg:text-4xl mt-auto mb-auto">{coverage.hours} hours</p>
            <p className="text-center text-sm mb-auto">{coverage.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourCoverage;
