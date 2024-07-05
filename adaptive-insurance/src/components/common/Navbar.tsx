"use client";
import LeftArrowIcon from "@/elements/icons/LeftArrowIcon";
import PhoneIcon from "@/elements/icons/PhoneIcon";
import Image from "next/image";
import React from "react";
import { InfoContainer, NavbarIconContainer, NavbarWrapper } from "./style";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <NavbarWrapper>
      <NavbarIconContainer>
        <LeftArrowIcon />
      </NavbarIconContainer>
      <Image
        className="ml-auto mr-auto md:ml-0 md:mr-0"
        src={require("@/../public/adaptive-logo.svg")}
        alt=""
      />
      <NavbarIconContainer>
        <PhoneIcon />
      </NavbarIconContainer>
      <InfoContainer>
        <p>Speak to a licensed agent :</p>
        <p className="font-bold text-lg">1-800-000-0000</p>
      </InfoContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
