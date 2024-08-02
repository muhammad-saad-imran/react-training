'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { useFormik } from 'formik';
import { isEmpty, isEqual } from 'lodash';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  initBusinessInfoState,
  selectBusinessInformation,
  selectBusinessRevenue,
  setBusinessInformation,
  setBusinessRevenue,
} from '@/store/feature/business-info';
import {
  useCreateQuoteMutation,
  useGetQuoteQuery,
} from '@/store/api/adaptiveApiSlice';
import {
  getAddressFromQuote,
  getBusinessInfoFromQuote,
  getCoverageFromQuote,
  getPolicyFromQuote,
} from '@/utils/adaptiveApiUtils';
import { changeCoveragePolicy } from '@/store/feature/policy-coverage';
import { IBusinessInformation, ICreateQuoteParams } from '@/store/api/types';
import { IBusinessRevenue } from '@/store/feature/business-info/types';
import { businessRevenueSchema } from '@/validations/quoteValidations';
import { businessRevenueConfig } from '@/config/businessRevenueConfig';
import BusinessInfoFormsContainer from '@/components/business-info/BusinessInfoFormsContainer';
import FormikInputField from '@/components/common/FormikInputField';
import BottomNavBar from '@/components/common/BottomNavBar';
import Loader from '@/components/common/Loader';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

type Props = {};

const BusinessRevenuePage = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loadingRef = useRef<LoadingBarRef>(null);

  const quoteId = useMemo(
    () => searchParams.get('quoteId') || '',
    [searchParams]
  );

  const { data: quote, ...quoteQueryResult } = useGetQuoteQuery(quoteId);
  const [createQuote, createQuoteResult] = useCreateQuoteMutation();

  const dispatch = useAppDispatch();
  const businessRevenue = useAppSelector(selectBusinessRevenue);
  const businessInformation = useAppSelector(selectBusinessInformation);
  const businessInfoFromQuote = getBusinessInfoFromQuote(quote);

  const createQuoteParams: ICreateQuoteParams = useMemo(
    () => ({
      quoteId,
      step: 'businessInformation',
      product: 'Outage',
    }),
    [quoteId]
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: businessRevenue,
    validationSchema: businessRevenueSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const params = {
          ...createQuoteParams,
          businessInformation: { ...businessInformation, ...values },
        };
        if (!isEqual(businessInfoFromQuote, params))
          await createQuote(params).unwrap();
        router.push(`/review-quote?quoteId=${quoteId}`);
      } catch (error: any) {
        if (error?.status === 400 && Array.isArray(error?.data?.message)) {
          error?.data?.message.map((err: string) => toast.error(err));
        } else toast.error('Something went wrong. Try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (!quote) loadingRef.current?.continuousStart();

    if (quote) {
      const policy = getPolicyFromQuote(quote);
      dispatch(changeCoveragePolicy(policy));
      if (
        quote.insured &&
        isEqual(businessInformation, initBusinessInfoState)
      ) {
        const businessInfo = getBusinessInfoFromQuote(quote);
        dispatch(setBusinessInformation(businessInfo));
      }
      loadingRef.current?.complete();
    }
  }, [quote, businessInformation, dispatch]);

  useEffect(() => {
    // Quotes query error handling
    if (
      quoteQueryResult.isError ||
      (!quoteQueryResult.isLoading && isEmpty(quote))
    ) {
      if (
        isEmpty(quote) ||
        (quoteQueryResult.error &&
          'status' in quoteQueryResult.error &&
          quoteQueryResult.error.status === 404)
      )
        notFound();
      else throw quoteQueryResult.error;
    }

    if (!quoteQueryResult.isFetching && quote) {
      const completed = quote.data.metadata.completed_sections;
      if (!completed.address) {
        router.push('/');
      } else if (!completed.coverage) {
        router.push(`/policy-coverage?quoteId=${quoteId}`);
      }
    }
  }, [
    quote,
    quoteQueryResult.isError,
    quoteQueryResult.isFetching,
    quoteQueryResult.error,
    quoteQueryResult.isLoading,
    quoteId,
    router,
  ]);

  const getFieldAttrs = (
    fieldName: keyof IBusinessRevenue,
    extraAttrs: any = {}
  ) => ({
    ...extraAttrs,
    ...businessRevenueConfig.inputs[fieldName],
    value: formik.values[fieldName],
    error: formik.errors[fieldName],
    touched: formik.touched[fieldName],
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
  });

  return (
    <BusinessInfoFormsContainer title="Business Revenue Range">
      <LoadingBar ref={loadingRef} />
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <FormikInputField {...getFieldAttrs('revenueRangeFrom')} />
        <FormikInputField {...getFieldAttrs('revenueRangeTo')} />
        <BottomNavBar
          buttonLabel="Next: Review and Pay"
          disabled={
            createQuoteResult.isLoading ||
            quoteQueryResult.isLoading ||
            formik.isSubmitting
          }
        />
      </form>
    </BusinessInfoFormsContainer>
  );
};

export default BusinessRevenuePage;
