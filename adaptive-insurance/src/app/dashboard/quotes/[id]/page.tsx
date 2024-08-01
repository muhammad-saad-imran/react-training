'use client';
import React from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { find, isEmpty } from 'lodash';
import { useGetQuoteQuery } from '@/store/api/adaptiveApiSlice';
import { currencyFormat } from '@/utils/quoteUtils';
import { getAddressFromQuote } from '@/utils/adaptiveApiUtils';
import {
  Title,
  DetailsContainer,
  QuoteDetailsContainer,
  PageWrapper,
  PaymentContainer,
} from '@/components/quotes/style';
import Link from 'next/link';
import Button from '@/elements/buttons/Button';
import Loader from '@/components/common/Loader';

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

  const address = getAddressFromQuote(quote);
  const selectedEstimate = find(quote?.data?.quoteEstimates, {
    productId: quote?.data?.selectedEstimateId,
  });

  const fullAddress = `${address.street}, ${address.street2}${address.street2 === '' ? '' : ','} ${address.city}, ${address.state}, ${address.zipCode}`;
  const documentUrl = quote?.documents?.quote[0]?.documentUrl || '#';
  const programUrl = quote?.programInfo[0]?.data?.program_url || '#';

  // Quotes query error handling
  if (isError || (!isLoading && isEmpty(quote))) {
    if (isEmpty(quote) || (error && 'status' in error && error.status === 404))
      return notFound();
    else throw error;
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
    <PageWrapper>
      {isLoading && <Loader />}
      <Title>Quote Details</Title>

      <QuoteDetailsContainer className="text-sm md:hidden md:text-base">
        <PaymentContainer>
          <p className="text-lg md:text-xl">Pay in-Full</p>
          <div>
            <div className="flex justify-between text-slate-500">
              <p>Gross Premium</p>
              <p>{currencyFormat(selectedEstimate?.premiumAmount as number)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-slate-500">Total</p>
              <p className="text-base md:text-lg">
                {currencyFormat(selectedEstimate?.premiumAmount as number)}
              </p>
            </div>
          </div>
          <Button onClick={() => window.open(programUrl, '_blank')}>Pay</Button>
        </PaymentContainer>
      </QuoteDetailsContainer>

      <QuoteDetailsContainer>
        <div className="flex w-full gap-10">
          <DetailsContainer>
            <div>
              <p className="text-slate-500">Quote Id </p>
              <p className="text-base md:text-lg">{quote?.id}</p>
            </div>
            <div>
              <p className="text-slate-500">Quote Number</p>
              <p className="text-base md:text-lg">{quote?.quoteNumber}</p>
            </div>
            <div>
              <p className="text-slate-500">Business Name</p>
              <p className="text-base md:text-lg">
                {quote?.insured?.businessName}
              </p>
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
              className="text-base underline md:text-lg"
              href={documentUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Invoice
            </Link>
          </DetailsContainer>

          <div className="hidden md:block">
            <PaymentContainer>
              <p className="md:text-xl">Pay in-Full</p>
              <div>
                <div className="flex justify-between text-slate-500">
                  <p>Gross Premium</p>
                  <p>
                    {currencyFormat(selectedEstimate?.premiumAmount as number)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-slate-500">Total</p>
                  <p className="md:text-lg">
                    {currencyFormat(selectedEstimate?.premiumAmount as number)}
                  </p>
                </div>
              </div>
              <Button onClick={() => window.open(programUrl, '_blank')}>
                Pay
              </Button>
            </PaymentContainer>
          </div>
        </div>
      </QuoteDetailsContainer>
    </PageWrapper>
  );
};

export default QuoteDetailsPage;
