'use client';
import React, { useEffect, useMemo } from 'react';
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
import PaymentDetails from '@/components/quotes/PaymentDetails';
import QuoteDetails from '@/components/quotes/QuoteDetails';
import BillableDetails from '@/components/quotes/BillableDetails';

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

  const address = useMemo(() => getAddressFromQuote(quote), [quote]);
  const selectedEstimate = useMemo(
    () =>
      find(quote?.data?.quoteEstimates, {
        productId: quote?.data?.selectedEstimateId,
      }),
    [quote]
  );
  const fullAddress = useMemo(
    () =>
      `${address.street}, ${address.street2}${address.street2 === '' ? '' : ','} ${address.city}, ${address.state}, ${address.zipCode}`,
    [address]
  );
  const documentUrl = useMemo(
    () => quote?.documents?.quote[0]?.documentUrl || '#',
    [quote]
  );
  const programUrl = useMemo(
    () => quote?.programInfo[0]?.data?.program_url || '#',
    [quote]
  );

  useEffect(() => {
    if (isError || (!isLoading && isEmpty(quote))) {
      if (
        isEmpty(quote) ||
        (error && 'status' in error && error.status === 404)
      )
        notFound();
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
  }, [quote, isError, isLoading, router]);

  return (
    <PageWrapper>
      {isLoading && <Loader />}
      <Title>Quote Details</Title>

      <QuoteDetailsContainer className="text-sm md:hidden md:text-base">
        <PaymentDetails
          programUrl={programUrl}
          selectedEstimate={selectedEstimate}
        />
      </QuoteDetailsContainer>

      <QuoteDetailsContainer>
        <div className="flex w-full gap-10">
          <QuoteDetails
            quote={quote}
            selectedEstimate={selectedEstimate}
            documentUrl={documentUrl}
            fullAddress={fullAddress}
          />

          <div className="hidden md:block">
            <PaymentContainer>
              <PaymentDetails
                programUrl={programUrl}
                selectedEstimate={selectedEstimate}
              />
            </PaymentContainer>
          </div>
        </div>
      </QuoteDetailsContainer>

      <QuoteDetailsContainer>
        <BillableDetails />
      </QuoteDetailsContainer>
    </PageWrapper>
  );
};

export default QuoteDetailsPage;
