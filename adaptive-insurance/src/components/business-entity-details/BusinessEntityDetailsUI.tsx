"use client";
import React from "react";
import BusinessEntityDetailsForm from "./BusinessEntityDetailsForm";
import BusinessInfoFormsContainer from "@/components/business-info/BusinessInfoFormsContainer";

type Props = {};

const BusinessEntityDetailsUI = (props: Props) => {
  return (
    <BusinessInfoFormsContainer title="Enter your business details">
      <BusinessEntityDetailsForm />
    </BusinessInfoFormsContainer>
  );
};

export default BusinessEntityDetailsUI;
