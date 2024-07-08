import Button from "@/elements/buttons/Button";
import BlueTickIcon from "@/elements/icons/BlueTickIcon";
import moment from "moment";
import React from "react";
import styled from "styled-components";
import { HorizontalLine, QuoteContainer, QuoteWrapper } from "./style";

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
    <QuoteWrapper>
      <QuoteContainer>
        <div className="mr-auto md:mr-0">
          <p className="font-bold uppercase md:text-center">Your quote</p>
          <p className="text-xl mt-4 md:text-center">Adaptive Power</p>
          <p className="text-xl md:text-center">Outage Coverage</p>
        </div>

        <div>
          <p className="text-5xl font-bold mt-3">$13</p>
          <p className="text-sm mt-2">Billed Monthly</p>
        </div>
      </QuoteContainer>

      <div className="hidden md:block">
        <HorizontalLine className="mt-7" />
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
    </QuoteWrapper>
  );
};


export default QuoteCard;
