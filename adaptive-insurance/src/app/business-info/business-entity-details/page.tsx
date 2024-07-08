"use client";
import React from "react";
import BusinessInfoFormsContainer from "@/components/business-info/BusinessInfoFormsContainer";
import BusinessEntityDetailsForm from "@/components/business-entity-details/BusinessEntityDetailsForm";

type Props = {};

const BusinessEntityPage = (props: Props) => {
  return (
    <BusinessInfoFormsContainer title="Enter your business details">
      <BusinessEntityDetailsForm />
    </BusinessInfoFormsContainer>
  );
};

export default BusinessEntityPage;
