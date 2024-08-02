'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { find, isArray, isEmpty } from 'lodash';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { useGetQuoteQuery } from '@/store/api/adaptiveApiSlice';
import { getAddressFromQuote } from '@/utils/adaptiveApiUtils';
import {
  Title,
  QuoteDetailsContainer,
  PageWrapper,
  PaymentContainer,
} from '@/components/quotes/style';
import PaymentDetails from '@/components/quotes/PaymentDetails';
import QuoteDetails from '@/components/quotes/QuoteDetails';
import BillableDetails from '@/components/quotes/BillableDetails';
import AgentDetails from '@/components/quotes/AgentDetails';

type Props = {};

const QuoteDetailsPage = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const loadingRef = useRef<LoadingBarRef>(null);

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
  const billableData = useMemo(
    () =>
      isArray(quote?.programInfo[0]?.billableData)
        ? quote?.programInfo[0]?.billableData[0]
        : (quote?.programInfo[0]?.billableData as any)?.data[0],
    [quote]
  );
  const fullAddress = useMemo(
    () =>
      `${address.street}, ${address.street2}${address.street2 === '' ? '' : ','} ${address.city} ${address.state} ${address.zipCode}`,
    [address]
  );

  useEffect(() => {
    if (!quote) loadingRef.current?.continuousStart();
    if (quote) loadingRef.current?.complete();

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
      <LoadingBar ref={loadingRef} />
      <Title>Quote Details</Title>

      <QuoteDetailsContainer className="text-sm md:hidden md:text-base">
        <PaymentDetails
          programUrl={quote?.programInfo[0]?.data?.program_url || '#'}
          selectedEstimate={selectedEstimate}
        />
      </QuoteDetailsContainer>

      <QuoteDetailsContainer>
        <div className="flex w-full gap-10">
          <QuoteDetails
            quote={quote}
            selectedEstimate={selectedEstimate}
            programInfo={quote?.programInfo[0]}
            documentUrl={quote?.documents?.quote[0]?.documentUrl || '#'}
            fullAddress={fullAddress}
          />

          <div className="hidden md:block">
            <PaymentContainer>
              <PaymentDetails
                programUrl={quote?.programInfo[0]?.data?.program_url || '#'}
                selectedEstimate={selectedEstimate}
              />
            </PaymentContainer>
          </div>
        </div>
      </QuoteDetailsContainer>

      <div className="flex w-full max-w-6xl flex-col gap-5 md:flex-row">
        <QuoteDetailsContainer>
          <AgentDetails agent={quote?.agent} />
        </QuoteDetailsContainer>
        <QuoteDetailsContainer>
          <BillableDetails billableData={billableData} />
        </QuoteDetailsContainer>
      </div>
    </PageWrapper>
  );
};

export default QuoteDetailsPage;
