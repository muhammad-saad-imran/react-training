'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { isEmpty } from 'lodash';
import toast from 'react-hot-toast';
import {
  useCreateQuoteMutation,
  useGetQuoteQuery,
} from '@/store/api/adaptiveApiSlice';
import { changeCoveragePolicy } from '@/store/feature/policy-coverage';
import { useAppDispatch } from '@/store/hooks';
import { setBusinessInformation } from '@/store/feature/business-info';
import { IAddress, ICreateQuoteParams } from '@/store/api/types';
import { currencyFormat, getCompleteAddress } from '@/utils/quoteUtils';
import {
  getAddressFromQuote,
  getBusinessInfoFromQuote,
  getCoverageFromQuote,
  getPolicyFromQuote,
} from '@/utils/adaptiveApiUtils';
import { Title } from '@/components/business-info/style';
import BottomNavBar from '@/components/common/BottomNavBar';
import Loader from '@/components/common/Loader';
import DisabledInputField from '@/components/common/DisabledInputField';

type Props = {};

const ReviewPage = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();

  const quoteId = searchParams.get('quoteId') || '';

  const { data: quote, ...quoteQueryResult } = useGetQuoteQuery(quoteId);
  const [createQuote, createQuoteResult] = useCreateQuoteMutation();

  const [loading, setLoading] = useState(quote ? false : true);

  const address = getAddressFromQuote(quote);
  const policy = getPolicyFromQuote(quote);
  const coverage = getCoverageFromQuote(quote);
  const businessInformation = getBusinessInfoFromQuote(quote);

  const createQuoteParams: ICreateQuoteParams = useMemo(
    () => ({
      quoteId,
      address,
      coverage,
      businessInformation,
      checkout: {},
      step: 'checkout',
      product: 'Outage',
    }),
    [quoteId, address, coverage, businessInformation]
  );

  const disableSubmit =
    quoteQueryResult.isLoading || createQuoteResult.isLoading;

  useEffect(() => {
    const completeQuoteCheckout = async () => {
      try {
        await createQuote(createQuoteParams).unwrap();
      } catch (error: any) {
        if (error?.status === 400 && Array.isArray(error?.data?.message)) {
          error?.data?.message.map((err: string) => toast.error(err));
        } else toast.error('An error ocurred while checking out');
      }
    };

    if (!quoteQueryResult.isFetching && quote) {
      const completed = quote.data.metadata.completed_sections;
      dispatch(changeCoveragePolicy(policy));
      dispatch(setBusinessInformation(businessInformation));
      if (!completed.checkout) {
        completeQuoteCheckout();
      }
      setLoading(false);
    }
  }, [
    quote,
    businessInformation,
    dispatch,
    createQuote,
    createQuoteParams,
    quoteQueryResult.isFetching,
    policy,
  ]);

  // Quotes query error handling
  if (
    quoteQueryResult.isError ||
    (!quoteQueryResult.isLoading && isEmpty(quote))
  ) {
    const error = quoteQueryResult.error;
    if (isEmpty(quote) || (error && 'status' in error && error.status === 404))
      return notFound();
    else throw error;
  }

  if (!quoteQueryResult.isFetching && quote) {
    const completed = quote.data.metadata.completed_sections;
    if (!completed.address) {
      router.push('/');
    } else if (!completed.coverage) {
      router.push(`/policy-coverage?quoteId=${quoteId}`);
    } else if (!completed.businessInformation) {
      router.push(`/business-info/business-entity-details?quoteId=${quoteId}`);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {loading && <Loader />}

      <Title>Review Information</Title>
      <DisabledInputField
        label="Business Name"
        value={businessInformation.businessName}
      />
      <DisabledInputField
        label="Business Type"
        value={businessInformation.businessType}
      />
      <DisabledInputField
        label="Contact Name"
        value={businessInformation.contactName}
      />
      <DisabledInputField label="Email" value={businessInformation.email} />
      <DisabledInputField
        label="Alternative Email"
        value={businessInformation.alternativeEmail}
      />
      <DisabledInputField label="Phone" value={businessInformation.phone} />
      <DisabledInputField
        label="Business Address"
        value={getCompleteAddress(address)}
      />
      <DisabledInputField
        label="Mailing Address"
        value={getCompleteAddress(businessInformation.mailingAddress)}
      />
      <DisabledInputField
        label="Billing Address"
        value={getCompleteAddress(businessInformation.billingAddress)}
      />
      <DisabledInputField
        label="Revenue Range"
        value={`${currencyFormat(
          businessInformation.revenueRangeFrom
        )} - ${currencyFormat(businessInformation.revenueRangeTo)}`}
      />
      <BottomNavBar
        buttonLabel="Next: Checkout"
        disabled={disableSubmit}
        onButtonClick={() => window.open('https://www.google.com/', '_blank')}
      />
    </div>
  );
};

export default ReviewPage;
