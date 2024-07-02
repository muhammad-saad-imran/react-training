import React from "react";
import BusinessEntityDetailsForm from "./BusinessEntityDetailsForm";

type Props = {};

const BusinessEntityDetailsUI = (props: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-2xl md:text-4xl lg:text-5xl">Enter your business details </p>
      <p>* Required </p>
      <BusinessEntityDetailsForm />
    </div>
  );
};

export default BusinessEntityDetailsUI;
