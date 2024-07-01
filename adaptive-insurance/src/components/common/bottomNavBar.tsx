"use client";
import Button from "@/elements/buttons/Button";
import LeftArrowIcon from "@/elements/icons/leftArrowIcon";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  buttonLabel: string;
};

const BottomNavBar = (props: Props) => {
    const router = useRouter()
  return (
    <div className="hidden md:flex w-full py-6 px-9 flex items-center bg-white fixed bottom-0 z-50">
      <div className="flex gap-2 mr-auto pointer cursor-pointer" onClick={() => router.back()}>
        <LeftArrowIcon />
        <p className="font-bold">Back</p>
      </div>
      <Button>{props.buttonLabel}</Button>
    </div>
  );
};

export default BottomNavBar;
