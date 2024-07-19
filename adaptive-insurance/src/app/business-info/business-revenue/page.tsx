"use client";
import React, { useEffect } from "react";
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

type Props = {};

const BusinessRevenuePage = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const businessRevenue = useAppSelector(selectBusinessRevenue);
  const businessInformation = useAppSelector(
    selectBusinessInformation
  ) as IBusinessInformation;

  const quoteId = searchParams.get("quoteId") || "";

  const { data: quote, ...quoteQueryResult } = useGetQuoteQuery(quoteId);
  const [createQuote, createQuoteResult] = useCreateQuoteMutation();

  const address = getAddressFromQuote(quote);
  const coverage = getCoverageFromQuote(quote);

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
        console.log(params, "params")
        await createQuote(params);
      } catch (error) {
        console.log(error, "error");
      }
      setSubmitting(false);
    },
  });

  const loading =
    createQuoteResult.isLoading ||
    quoteQueryResult.isLoading ||
    formik.isSubmitting;

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
      if (quote.insured && isEqual(businessInformation, initBusinessInfoState)) {
        const businessInfo = getBusinessInfoFromQuote(quote);
        dispatch(setBusinessInformation(businessInfo));
      }
    }
  }, [quote]);

  return (
    <BusinessInfoFormsContainer title="Business Revenue Range">
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <FormikInputField {...getFieldAttrs("revenueRangeFrom")} />
        <FormikInputField {...getFieldAttrs("revenueRangeTo")} />
        <BottomNavBar buttonLabel="Next: Review and Pay" disabled={loading} />
      </form>
    </BusinessInfoFormsContainer>
  );
};

export default BusinessRevenuePage;
