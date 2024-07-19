"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import { isEqual } from "lodash";
import { useMask } from "@react-input/mask";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  initBusinessInfoState,
  selectBusinessDetails,
  selectBusinessInformation,
  setBusinessDetails,
  setBusinessInformation,
} from "@/store/feature/business-info";
import { useGetQuoteQuery } from "@/store/api/adaptiveApiSlice";
import { changeCoveragePolicy } from "@/store/feature/policy-coverage";
import {
  getBusinessInfoFromQuote,
  getPolicyFromQuote,
} from "@/utils/adaptiveApiUtils";
import { businessDetailsSchema } from "@/validations/businessInfoValidations";
import { businessDetailsConfig } from "@/config/businessDetailsConfig";
import BusinessInfoFormsContainer from "@/components/business-info/BusinessInfoFormsContainer";
import BottomNavBar from "@/components/common/BottomNavBar";
import FormikInputField from "@/components/common/FormikInputField";
import Loader from "@/components/common/Loader";

type Props = {};

const BusinessEntityPage = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const businessDetails = useAppSelector(selectBusinessDetails);
  const businessInformation = useAppSelector(selectBusinessInformation);

  const quoteId = searchParams.get("quoteId") || "";

  const { data: quote, isLoading } = useGetQuoteQuery(quoteId);

  const formik = useFormik<any>({
    enableReinitialize: true,
    initialValues: businessDetails,
    validationSchema: businessDetailsSchema,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(setBusinessDetails(values));
      setSubmitting(false);
      router.push(`business-mailing-address?quoteId=${quoteId}`);
    },
  });

  const loading = formik.isSubmitting || isLoading;

  const getFieldAttrs = (fieldName: string, extraAttrs: any = {}) => ({
    ...extraAttrs,
    ...businessDetailsConfig.inputs[fieldName],
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
    }
  }, [quote]);

  return (
    <BusinessInfoFormsContainer title="Enter your business details">
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        {loading && <Loader />}
        <FormikInputField {...getFieldAttrs("businessType")} />
        <FormikInputField {...getFieldAttrs("businessName")} />
        <FormikInputField {...getFieldAttrs("contactName")} />
        <FormikInputField {...getFieldAttrs("email")} />
        <FormikInputField {...getFieldAttrs("alternativeEmail")} />
        <FormikInputField
          {...getFieldAttrs("phone", {
            ref: useMask({ mask: "+___________", replacement: { _: /\d/ } }),
          })}
        />
        <BottomNavBar
          buttonLabel="Next: Business Mailing Address"
          disabled={loading}
        />
      </form>
    </BusinessInfoFormsContainer>
  );
};

export default BusinessEntityPage;
