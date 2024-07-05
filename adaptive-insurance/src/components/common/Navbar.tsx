"use client";
import LeftArrowIcon from "@/elements/icons/LeftArrowIcon";
import PhoneIcon from "@/elements/icons/PhoneIcon";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <Wrapper>
      <IconContainer>
        <LeftArrowIcon />
      </IconContainer>
      <Image
        className="ml-auto mr-auto md:ml-0 md:mr-0"
        src={require("@/../public/adaptive-logo.svg")}
        alt=""
      />
      <IconContainer>
        <PhoneIcon />
      </IconContainer>
      <InfoContainer>
        <p>Speak to a licensed agent :</p>
        <p className="font-bold text-lg">1-800-000-0000</p>
      </InfoContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div.attrs({
  className:
    "w-full py-6 px-9 flex items-center bg-white drop-shadow fixed top-0 z-50",
})``;

const IconContainer = styled.div.attrs({
  className: "md:hidden cursor-pointer",
})``;

const InfoContainer = styled.div.attrs({
  className: "gap-2 ml-auto items-center hidden md:flex",
})``;

export default Navbar;
