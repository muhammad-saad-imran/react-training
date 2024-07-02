"use client";
import Button from "@/elements/buttons/Button";
import LeftArrowIcon from "@/elements/icons/LeftArrowIcon";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  buttonLabel: string;
  onButtonClick: () => void;
};

const BottomNavBar = (props: Props) => {
  const router = useRouter();
  return (
    <div className="flex w-full py-6 px-9 rounded-t-lg md:rounded-none flex items-center bg-white fixed bottom-0 left-0 z-50">
      <div
        className="hidden md:flex gap-2 mr-auto cursor-pointer"
        onClick={() => router.back()}
      >
        <LeftArrowIcon />
        <p className="font-bold">Back</p>
      </div>

      <div className="flex md:hidden flex-col gap-2 justify-center items-center mr-auto cursor-pointer">
        <p className="text-sm font-bold uppercase">Your quote</p>
        <p className="text-lg">$13/mo</p>
      </div>

      <Button onClick={props.onButtonClick}>{props.buttonLabel}</Button>
    </div>
  );
};

export default BottomNavBar;
