"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectBusinessRevenue,
  setBusinessRevenue,
} from "@/store/feature/business-info";
import { businessRevenueSchema } from "@/validations/businessInfoValidations";
import { businessRevenueConfig } from "@/config/businessRevenueConfig";
import BusinessInfoFormsContainer from "@/components/business-info/BusinessInfoFormsContainer";
import FormikInputField from "@/components/common/FormikInputField";
import BottomNavBar from "@/components/common/BottomNavBar";

type Props = {};

const BusinessRevenuePage = (props: Props) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const businessRevenue = useAppSelector(selectBusinessRevenue);

  const formik = useFormik<any>({
    initialValues: businessRevenue,
    validationSchema: businessRevenueSchema,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(setBusinessRevenue(values));
      setSubmitting(false);
      //   router.push("business-revenue");
    },
  });

  const getFieldAttrs = (fieldName: string, extraAttrs: any = {}) => ({
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
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <FormikInputField {...getFieldAttrs("revenueFrom")} />
        <FormikInputField {...getFieldAttrs("revenueTo")} />
        <BottomNavBar
          buttonLabel="Next: Review and Pay"
          disabled={formik.isSubmitting}
        />
      </form>
    </BusinessInfoFormsContainer>
  );
};

export default BusinessRevenuePage;
