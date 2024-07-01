import LeftArrowIcon from "@/elements/icons/leftArrowIcon";
import PhoneIcon from "@/elements/icons/phoneIcon";
import Image from "next/image";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="w-full py-6 px-9 flex items-center bg-white drop-shadow fixed top-0 z-50">
      <div className="md:hidden cursor-pointer"><LeftArrowIcon /></div>
      <Image className="ml-auto mr-auto md:ml-0 md:mr-0" src={require("@/../public/adaptive-logo.svg")} alt="" />
      <div className="md:hidden cursor-pointer"><PhoneIcon /></div>
      <div className="gap-2 ml-auto items-center hidden md:flex">
        <p>Speak to a licensed agent :</p>
        <p className="font-bold text-lg">1-800-000-0000</p>
      </div>
    </div>
  );
};

export default Navbar;
