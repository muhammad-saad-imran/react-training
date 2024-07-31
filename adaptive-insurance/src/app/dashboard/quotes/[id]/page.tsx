'use client';
import Button from '@/elements/buttons/Button';
import { useGetQuoteQuery } from '@/store/api/adaptiveApiSlice';
import { currencyFormat } from '@/utils/quoteUtils';
import { find, isEmpty } from 'lodash';
import { notFound, useParams, useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

const QuoteDetailsPage = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: quote,
    error,
    isError,
    isFetching,
    isLoading,
  } = useGetQuoteQuery(id);

  const selectedEstimate = find(quote?.data?.quoteEstimates, {
    productId: quote?.data?.selectedEstimateId,
  });

  // Quotes query error handling
  if (isError || (!isLoading && isEmpty(quote))) {
    if (isEmpty(quote) || (error && 'status' in error && error.status === 404))
      console.log('Not found.');
    else console.log('Something went wrong.');
  }

  if (!isFetching && quote) {
    const completed = quote.data.metadata.completed_sections;
    if (!completed.address) {
      router.push('/');
    } else if (!completed.coverage) {
      router.push(`/policy-coverage?quoteId=${id}`);
    } else if (!completed.businessInformation) {
      router.push(`/business-info/business-entity-details?quoteId=${id}`);
    } else if (!completed.checkout) {
      router.push(`/review-quote?quoteId=${id}`);
    }
  }

  return (
    <div className="p-3 pt-8">
      <p className="mb-10 text-center text-5xl">Quote Details</p>
      {/* <p>Coverage: {selectedEstimate?.coverageAmount}</p>
      <p>Duration: {selectedEstimate?.duration}</p>
      <p>Amount: {selectedEstimate?.premiumAmount}</p> */}
      <div className="flex items-center justify-center">
        <div className="flex w-[40rem] flex-col rounded-xl bg-white p-8 shadow-md">
          <p className="mb-6 text-xl">Pay in-Full</p>
          <div className="flex justify-between text-slate-500">
            <p>Gross Premium</p>
            <p>{currencyFormat(selectedEstimate?.premiumAmount as number)}</p>
          </div>
          <div className="mb-5 flex justify-between">
            <p className="text-slate-500">Total</p>
            <p className="text-lg">
              {currencyFormat(selectedEstimate?.premiumAmount as number)}
            </p>
          </div>
          <Button>Pay</Button>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetailsPage;
