"use client";
import Button from "@/elements/buttons/Button";
import Input from "@/elements/inputs/Input";
import Image from "next/image";
import React from "react";

type Props = {};

const ZipInput = (props: Props) => {
  return (
    <div className="w-full md:w-3/5 flex flex-col md:justify-center items-center gap-8 md:gap-16">
      <div className="w-full flex flex-col items-center gap-6 md:gap-8">
        <Image
          src={require("@/../public/logo.svg")}
          alt=""
          className="size-20 md:size-24"
        />
        <p className="text-3xl md:text-5xl">Get a quote in seconds</p>
      </div>

      <div className="w-full flex flex-col items-center gap-3 md:gap-16">
        <Input placeholder="Enter ZIP Code" />
        <Button className="w-full md:w-2/5">Get Your Quote</Button>
      </div>

      <p className="text-center md:w-2/4">
        If you have more than one location, reach out to us directly at
        123-456-7890.
      </p>
    </div>
  );
};

export default ZipInput;
