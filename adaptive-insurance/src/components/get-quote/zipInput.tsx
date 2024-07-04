"use client";
import Button from "@/elements/buttons/Button";
import Input from "@/elements/inputs/Input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

type Props = {};

const ZipInput = (props: Props) => {
  const router = useRouter();
  return (
    <Wrapper>
      <LogoContainer>
        <Image
          className="size-20 md:size-24"
          src={require("@/../public/logo.svg")}
          alt=""
        />
        <p className="text-3xl md:text-5xl">Get a quote in seconds</p>
      </LogoContainer>

      <ZipInputContainer>
        <Input placeholder="Enter ZIP Code" />
        <Button
          className="w-full md:w-2/5 text-sm"
          onClick={() => router.push("policy-coverage")}
        >
          Get Your Quote
        </Button>
      </ZipInputContainer>

      <p className="text-center md:w-2/4">
        If you have more than one location, reach out to us directly at
        123-456-7890.
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div.attrs({
  className:
    "w-full md:w-3/5 flex flex-col md:justify-center items-center gap-8 md:gap-16",
})``;

const LogoContainer = styled.div.attrs({
  className: "w-full flex flex-col items-center gap-6 md:gap-8",
})``;

const ZipInputContainer = styled.div.attrs({
  className: "w-full flex flex-col items-center gap-3 md:gap-16",
})``;

export default ZipInput;
