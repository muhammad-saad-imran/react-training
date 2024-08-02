import React from 'react';
import { IBillableData } from '@/store/api/types';
import { DetailsContainer } from '@/components/quotes/style';

type Props = {
  billableData: IBillableData | undefined;
};

const BillableDetails = ({ billableData }: Props) => {
  return (
    <DetailsContainer>
      <div>
        <p className="text-slate-500">Program Id </p>
        <p className="text-base md:text-lg">{billableData?.program_id}</p>
      </div>
      <div>
        <p className="text-slate-500">Coverage Type </p>
        <p className="text-base md:text-lg">
          {billableData?.coverage_type?.title}
        </p>
      </div>
      <div>
        <p className="text-slate-500">Carrier Title </p>
        <p className="text-base md:text-lg">{billableData?.carrier?.title}</p>
      </div>
      <div>
        <p className="text-slate-500">Carrier Address</p>
        <p className="text-base md:text-lg">
          {billableData?.carrier?.formatted_address}
        </p>
      </div>
      <div>
        <p className="text-slate-500">Wholesaler Title</p>
        <p className="text-base md:text-lg">
          {billableData?.wholesaler?.title}
        </p>
      </div>
      <div>
        <p className="text-slate-500">Wholesaler Address</p>
        <p className="text-base md:text-lg">
          {billableData?.wholesaler?.formatted_address}
        </p>
      </div>
    </DetailsContainer>
  );
};

export default BillableDetails;
