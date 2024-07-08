"use client";
import React from 'react'
import BusinessInfoFormsContainer from '@/components/business-info/BusinessInfoFormsContainer'
import BusinessMailingAddressForm from '@/components/business-mailing-address/BusinessMailingAddressForm'

type Props = {}

const BusinessMailingPage = (props: Props) => {
  return (
    <BusinessInfoFormsContainer title="Enter your business address">
      <BusinessMailingAddressForm />
    </BusinessInfoFormsContainer>
  )
}

export default BusinessMailingPage