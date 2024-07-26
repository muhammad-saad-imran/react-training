'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { isEmpty } from 'lodash';
import toast from 'react-hot-toast';
import {
  useCreateQuoteMutation,
  useGetQuoteQuery,
} from '@/store/api/adaptiveApiSlice';
import { ICreateQuoteParams } from '@/store/api/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setBusinessInformation } from '@/store/feature/business-info';
import {
  changeCoveragePolicy,
  selectPolicyCoverage,
} from '@/store/feature/policy-coverage';
import {
  getAddressFromQuote,
  getBusinessInfoFromQuote,
  getPolicyFromQuote,
} from '@/utils/adaptiveApiUtils';
import { getCoverage } from '@/utils/quoteUtils';
import BottomNavBar from '@/components/common/BottomNavBar';
import InstructionModal from '@/components/policy-coverage/InstructionModal';
import PolicyCoverageUI from '@/components/policy-coverage/PolicyCoverageUI';
import Loader from '@/components/common/Loader';

type Props = {};

const PolicyCoveragePage = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isModelHidden, setIsModelHidden] = useState(true);
  const [dateInputError, setDateInputError] = useState('');

  const quoteId = searchParams.get('quoteId') || '';

  const { data: quote, ...quoteQueryResult } = useGetQuoteQuery(quoteId);
  const [createQuote, createQuoteResult] = useCreateQuoteMutation();

  const [loading, setLoading] = useState(quote ? false : true);

  const address = getAddressFromQuote(quote);

  const policy = useAppSelector(selectPolicyCoverage);

  let createQuoteParams: ICreateQuoteParams = useMemo(
    () => ({
      quoteId,
      address,
      coverage: getCoverage(policy),
      step: 'coverage',
      product: 'Outage',
    }),
    [quoteId, address, policy]
  );

  const updatePolicy = useCallback(async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await createQuote(createQuoteParams).unwrap();
        resolve(res);
      } catch (error: any) {
        if (error?.status === 400 && Array.isArray(error?.data?.message)) {
          error?.data?.message.map((err: string) => toast.error(err));
        } else toast.error('Something went wrong. Try again.');
        reject(error);
      }
    });
  }, [createQuoteParams, createQuote]);

  const disableSubmit =
    quoteQueryResult.isLoading ||
    createQuoteResult.isLoading ||
    !quote?.data.quoteEstimates ||
    !quote?.data.selectedEstimateId;

  // Initialize the policy state in redux that UI uses
  useEffect(() => {
    if (quote && quote.data.quoteEstimates && quote.data.selectedEstimateId) {
      const policy = getPolicyFromQuote(quote);
      const businessInfo = getBusinessInfoFromQuote(quote);
      dispatch(changeCoveragePolicy(policy));
      dispatch(setBusinessInformation(businessInfo));
      setLoading(false);
    } else if (
      quote &&
      (!quote.data.quoteEstimates || !quote.data.selectedEstimateId)
    ) {
      // init policy coverage & quote estimates
      updatePolicy();
    }
  }, [quote, dispatch, updatePolicy]);

  // Updates quote estimates when coverage amount changes
  useEffect(() => {
    if (
      quote &&
      quote.data.quoteEstimates &&
      quote.data.quoteEstimates[0].coverageAmount !== policy.amount
    ) {
      updatePolicy();
    }
  }, [policy.amount, quote, updatePolicy]);

  async function onSubmit() {
    try {
      if (
        quote?.data.selectedEstimateId !== policy.selectedEstimateId ||
        quote?.effectiveDateUtc !== policy.effectiveDateUtc
      ) {
        await updatePolicy();
      }
      router.push(
        `/business-info/business-entity-details?quoteId=${quote?.id}`
      );
    } catch (error: any) {
      if (error?.status === 400 && Array.isArray(error?.data?.message)) {
        error?.data?.message.map((err: string) => {
          if (err.includes('effective date')) setDateInputError(err);
        });
      }
    }
  }

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
    }
  }

  return (
    <>
      {loading && <Loader />}
      <PolicyCoverageUI
        onShowModal={() => setIsModelHidden(false)}
        address={address}
        dateInputError={dateInputError}
      />
      <BottomNavBar
        buttonLabel="Next: Business Information"
        onButtonClick={onSubmit}
        disabled={disableSubmit}
      />
      <InstructionModal
        hide={isModelHidden}
        onCloseModal={() => setIsModelHidden(true)}
      />
    </>
  );
};

export default PolicyCoveragePage;
