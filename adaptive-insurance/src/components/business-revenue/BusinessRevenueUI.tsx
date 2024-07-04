"use client"
import React from "react";
import BusinessInfoFormsContainer from "../business-info/BusinessInfoFormsContainer";
import BusinessRevenueForm from "./BusinessRevenueForm";

type Props = {};

const BusinessRevenueUI = (props: Props) => {
  return (
    <BusinessInfoFormsContainer title="Business Revenue Range">
      <BusinessRevenueForm />
    </BusinessInfoFormsContainer>
  );
};

export default BusinessRevenueUI;
