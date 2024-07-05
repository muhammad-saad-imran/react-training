"use client"
import React from "react";
import BusinessInfoFormsContainer from "@/components//business-info/BusinessInfoFormsContainer";
import BusinessMailingAddressForm from "./BusinessMailingAddressForm";

type Props = {};

const BusinessMailingAddressUI = (props: Props) => {
  return (
    <BusinessInfoFormsContainer title="Enter your business address">
      <BusinessMailingAddressForm />
    </BusinessInfoFormsContainer>
  );
};

export default BusinessMailingAddressUI;
