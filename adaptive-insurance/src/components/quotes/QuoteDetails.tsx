import React from 'react';
import Link from 'next/link';
import { IProgramInfo, IQuote, IQuoteEstimate } from '@/store/api/types';
import { currencyFormat } from '@/utils/quoteUtils';
import { DetailsContainer } from '@/components/quotes/style';

type Props = {
  quote: IQuote | undefined;
  programInfo: IProgramInfo | undefined;
  selectedEstimate: IQuoteEstimate | undefined;
  documentUrl: string;
  fullAddress: string;
};

const QuoteDetails = ({
  quote,
  selectedEstimate,
  documentUrl,
  fullAddress,
  programInfo,
}: Props) => {
  return (
    <DetailsContainer className="border-slate-300 pr-8 md:border-r">
      <div>
        <p className="text-slate-500">Quote Id </p>
        <p className="text-base md:text-lg">{quote?.id}</p>
      </div>
      <div>
        <p className="text-slate-500">Quote Number</p>
        <p className="text-base md:text-lg">{quote?.quoteNumber}</p>
      </div>
      <div>
        <p className="text-slate-500">Status</p>
        <p className="text-base md:text-lg">{programInfo?.data?.status}</p>
      </div>
      <div>
        <p className="text-slate-500">Business Name</p>
        <p className="text-base md:text-lg">{quote?.insured?.businessName}</p>
      </div>
      <div>
        <p className="text-slate-500">Business Address</p>
        <p className="text-base md:text-lg">{fullAddress}</p>
      </div>
      <div>
        <p className="text-slate-500">Coverage Amount </p>
        <p className="text-base md:text-lg">
          {currencyFormat(selectedEstimate?.coverageAmount || 0)}
        </p>
      </div>
      <div>
        <p className="text-slate-500">Duration </p>
        <p className="text-base md:text-lg">
          {selectedEstimate?.duration} hours
        </p>
      </div>
      <Link
        className="w-fit text-base underline md:text-lg"
        href={documentUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Invoice
      </Link>
    </DetailsContainer>
  );
};

export default QuoteDetails;
