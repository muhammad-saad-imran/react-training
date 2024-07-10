"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  BackIconContainer,
  QuoteContainer,
  BottomNavbarContainer,
} from "./style";
import Button from "@/elements/buttons/Button";
import LeftArrowIcon from "@/elements/icons/LeftArrowIcon";

type Props = {
  buttonLabel: string;
  onButtonClick?: () => void;
  disabled?: boolean;
};

const BottomNavBar = (props: Props) => {
  const router = useRouter();
  return (
    <BottomNavbarContainer>
      <BackIconContainer onClick={() => router.back()}>
        <LeftArrowIcon />
        <p className="font-bold">Back</p>
      </BackIconContainer>

      <QuoteContainer>
        <p className="text-sm font-bold uppercase">Your quote</p>
        <p className="text-lg">$13/mo</p>
      </QuoteContainer>

      <Button
        type="submit"
        onClick={props.onButtonClick}
        disabled={props.disabled}
      >
        {props.buttonLabel}
      </Button>
    </BottomNavbarContainer>
  );
};

export default BottomNavBar;
