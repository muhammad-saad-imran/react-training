import React from "react";

type Props = {
  coverageLimitOpts: Array<{ limit: number }>;
  selectedLimit: number;
  onPolicyLimitChange: (value: number) => void;
};

const CoverageLimit = (props: Props) => {
  return (
    <div className="block">
      <p className="text-5xl text-center md:text-left">
        Now, select your coverage limit
      </p>
      <p className="my-6 text-center md:text-left">
        Should your business lose power for 12 hours, how much would you need to
        cover operations?
      </p>

      <div className="flex flex-wrap justify-around items-center md:justify-start md:items-start gap-8 mb-12">
        {props.coverageLimitOpts.map((coverage, index) => (
          <div
            key={index}
            className={
              "border rounded-lg flex flex-col justify-center items-center p-9 w-40 md:w-36 lg:w-48 cursor-pointer " +
              (props.selectedLimit === coverage.limit
                ? "bg-white border-deep-blue shadow-xl"
                : "border-gray text-gray")
            }
            onClick={() => props.onPolicyLimitChange(coverage.limit)}
          >
            <p className="font-bold md:text-xl lg:text-2xl">
              ${coverage.limit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoverageLimit;
