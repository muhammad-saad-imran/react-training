"use client";
import ZipInput from "@/components/get-quote/ZipInput";
import { useGetTodoByIdQuery } from "@/store/api/testApiSlice";
import React from "react";

type Props = {};

const GetQuoteContainer = (props: Props) => {
  const { data, error, isLoading } = useGetTodoByIdQuery(2);

  isLoading
    ? console.log("Loading Data...")
    : error
    ? console.log("Error: ", error)
    : console.log("Data: ", data);

  return (
    <div className="w-full h-full flex justify-center items-center p-6">
      <ZipInput />
    </div>
  );
};

export default GetQuoteContainer;
