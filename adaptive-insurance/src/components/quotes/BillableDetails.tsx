import { DetailsContainer } from '@/components/quotes/style';
import React from 'react';

type Props = {};

const BillableDetails = (props: Props) => {
  return (
    <DetailsContainer>
      <div>
        <p className="text-slate-500">Quote Id </p>
        <p className="text-base md:text-lg">{'quote?.id'}</p>
      </div>
      <div>
        <p className="text-slate-500">Quote Number</p>
        <p className="text-base md:text-lg">{'quote?.quoteNumber'}</p>
      </div>
      <div>
        <p className="text-slate-500">Business Name</p>
        <p className="text-base md:text-lg">{'quote?.insured?.businessName'}</p>
      </div>
      <div>
        <p className="text-slate-500">Business Address</p>
        <p className="text-base md:text-lg">{'fullAddress'}</p>
      </div>
      <div>
        <p className="text-slate-500">Coverage Amount </p>
        <p className="text-base md:text-lg">
          {'currencyFormat(selectedEstimate?.coverageAmount || 0)'}
        </p>
      </div>
    </DetailsContainer>
  );
};

export default BillableDetails;
