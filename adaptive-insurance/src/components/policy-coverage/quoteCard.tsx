import Button from "@/elements/buttons/Button";
import BlueTickIcon from "@/elements/icons/BlueTickIcon";
import moment from "moment";
import React from "react";

type Props = {
  policy: { hours: number; limit: number };
};

const QuoteCard = (props: Props) => {
  const includedInQuote = [
    `Coverage starting after ${props.policy.hours} hours of power loss`,
    `Coverage limit of $${props.policy.limit}`,
    `Coverage starting as of ${moment().format("D MMM, YYYY")}`,
    "Easy payment once your power goes out",
  ];

  return (
    <div className="md:w-80 lg:w-96 bg-white rounded-lg shadow-2xl py-10 px-8 flex-col items-center">
      <div className="flex md:flex-col md:items-center mb-12 md:mb-0">
        <div className="mr-auto md:mr-0">
          <p className="font-bold uppercase md:text-center">Your quote</p>
          <p className="text-xl mt-4 md:text-center">Adaptive Power</p>
          <p className="text-xl md:text-center">Outage Coverage</p>
        </div>

        <div>
          <p className="text-5xl font-bold mt-3">$13</p>
          <p className="text-sm mt-2">Billed Monthly</p>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="w-full border border-white border-t-gray mt-7"></div>
        <p className="font-bold my-7 text-center">What’s included:</p>

        <div className="flex flex-col gap-3">
          {includedInQuote.map((item) => (
            <div className="flex gap-4 items-center">
              <div className="size-6">
                <BlueTickIcon />
              </div>
              <p className="leading-none">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full md:hidden">Next: Business Information</Button>
    </div>
  );
};

export default QuoteCard;
