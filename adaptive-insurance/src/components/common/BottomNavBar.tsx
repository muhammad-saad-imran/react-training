"use client";
import Button from "@/elements/buttons/Button";
import LeftArrowIcon from "@/elements/icons/LeftArrowIcon";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

type Props = {
  buttonLabel: string;
  onButtonClick?: () => void;
  disabled?: boolean;
};

const BottomNavBar = (props: Props) => {
  const router = useRouter();
  return (
    <Container>
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
    </Container>
  );
};

const Container = styled.div.attrs({
  className:
    "flex w-full py-6 px-9 rounded-t-lg md:rounded-none flex items-center bg-white fixed bottom-0 left-0 z-50",
})``;

const QuoteContainer = styled.div.attrs({
  className:
    "flex md:hidden flex-col gap-2 justify-center items-center mr-auto cursor-pointer",
})``;

const BackIconContainer = styled.div.attrs({
  className: "hidden md:flex gap-2 mr-auto cursor-pointer",
})``;

export default BottomNavBar;
