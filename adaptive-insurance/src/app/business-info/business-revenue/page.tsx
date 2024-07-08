"use client";
import React from "react";
import BusinessInfoFormsContainer from "@/components/business-info/BusinessInfoFormsContainer";
import BusinessRevenueForm from "@/components/business-revenue/BusinessRevenueForm";

type Props = {};

const BusinessRevenuePage = (props: Props) => {
  return (
    <BusinessInfoFormsContainer title="Business Revenue Range">
      <BusinessRevenueForm />
    </BusinessInfoFormsContainer>
  );
};

export default BusinessRevenuePage;
