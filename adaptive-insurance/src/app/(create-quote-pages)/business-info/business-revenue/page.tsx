"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import { isEqual } from "lodash";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  initBusinessInfoState,
  selectBusinessInformation,
  selectBusinessRevenue,
  setBusinessInformation,
  setBusinessRevenue,
} from "@/store/feature/business-info";
import {
  useCreateQuoteMutation,
  useGetQuoteQuery,
} from "@/store/api/adaptiveApiSlice";
import {
  getAddressFromQuote,
  getBusinessInfoFromQuote,
  getCoverageFromQuote,
  getPolicyFromQuote,
} from "@/utils/adaptiveApiUtils";
import { changeCoveragePolicy } from "@/store/feature/policy-coverage";
import { IBusinessInformation, ICreateQuoteParams } from "@/store/api/types";
import { businessRevenueSchema } from "@/validations/businessInfoValidations";
import { businessRevenueConfig } from "@/config/businessRevenueConfig";
import BusinessInfoFormsContainer from "@/components/business-info/BusinessInfoFormsContainer";
import FormikInputField from "@/components/common/FormikInputField";
import BottomNavBar from "@/components/common/BottomNavBar";
import Loader from "@/components/common/Loader";

type Props = {};

const BusinessRevenuePage = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const quoteId = searchParams.get("quoteId") || "";

  const { data: quote, ...quoteQueryResult } = useGetQuoteQuery(quoteId);
  const [createQuote, createQuoteResult] = useCreateQuoteMutation();

  const [loading, setLoading] = useState(quote ? false : true);

  const dispatch = useAppDispatch();
  const businessRevenue = useAppSelector(selectBusinessRevenue);
  const businessInformation = useAppSelector(
    selectBusinessInformation
  ) as IBusinessInformation;

  const address = getAddressFromQuote(quote);
  const coverage = getCoverageFromQuote(quote);
  const quoteBusinessInfo = getBusinessInfoFromQuote(quote);

  const createQuoteParams: ICreateQuoteParams = {
    address,
    coverage,
    quoteId,
    step: "businessInformation",
    product: "Outage",
  };

  const formik = useFormik<any>({
    enableReinitialize: true,
    initialValues: businessRevenue,
    validationSchema: businessRevenueSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        dispatch(setBusinessRevenue(values));
        const params = {
          ...createQuoteParams,
          businessInformation: { ...businessInformation, ...values },
        };
        if (!isEqual(params.businessInformation, quoteBusinessInfo))
          await createQuote(params);
        router.push(`/review-quote?quoteId=${quoteId}`);
      } catch (error) {
        alert("Someting went wrong. Please try again later.");
      }
      setSubmitting(false);
    },
  });

  const disableSubmit =
    createQuoteResult.isLoading ||
    quoteQueryResult.isLoading ||
    formik.isSubmitting;

  // Quotes query error handling
  if (quoteQueryResult.isError) {
    return router.push("/");
  }

  if (quote) {
    const completed = quote.data.metadata.completed_sections;
    if (!completed.address) {
      return router.push("/");
    } else if (!completed.coverage) {
      return router.push(`/policy-coverage?quoteId=${quoteId}`);
    }
  }

  const getFieldAttrs = (fieldName: string, extraAttrs: any = {}) => ({
    ...extraAttrs,
    ...businessRevenueConfig.inputs[fieldName],
    value: formik.values[fieldName],
    error: formik.errors[fieldName],
    touched: formik.touched[fieldName],
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
  });

  useEffect(() => {
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
      setLoading(false);
    }
  }, [quote]);

  return (
    <BusinessInfoFormsContainer title="Business Revenue Range">
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        {loading && <Loader />}
        <FormikInputField {...getFieldAttrs("revenueRangeFrom")} />
        <FormikInputField {...getFieldAttrs("revenueRangeTo")} />
        <BottomNavBar
          buttonLabel="Next: Review and Pay"
          disabled={disableSubmit}
        />
      </form>
    </BusinessInfoFormsContainer>
  );
};

export default BusinessRevenuePage;
