"use client";
import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useMask } from "@react-input/mask";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectBusinessMailingAddress,
  setBusinessMailingAddress,
} from "@/store/feature/business-info";
import { businessAddressConfig } from "@/config/businessAddressConfig";
import { businessAddressSchema } from "@/validations/businessInfoValidations";
import BottomNavBar from "@/components//common/BottomNavBar";
import FormikInputField from "@/components//common/FormikInputField";

type Props = {};

const BusinessMailingAddressForm = (props: Props) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const businessAddress = useAppSelector(selectBusinessMailingAddress);

  const formik = useFormik<any>({
    initialValues: businessAddress,
    validationSchema: businessAddressSchema,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(setBusinessMailingAddress(values));
      setSubmitting(false);
      router.push("business-revenue");
    },
  });

  const getFieldAttrs = (fieldName: string, extraAttrs: any = {}) => ({
    ...extraAttrs,
    ...businessAddressConfig.inputs[fieldName],
    value: formik.values[fieldName],
    error: formik.errors[fieldName],
    touched: formik.touched[fieldName],
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
      <FormikInputField {...getFieldAttrs("addressLine1")} />
      <FormikInputField {...getFieldAttrs("addressLine2")} />
      <FormikInputField {...getFieldAttrs("city")} />
      <FormikInputField {...getFieldAttrs("state")} />
      <FormikInputField
        {...getFieldAttrs("zip", {
          ref: useMask({ mask: "_____", replacement: { _: /\d/ } }),
        })}
      />
      <FormikInputField {...getFieldAttrs("country")} />
      <FormikInputField
        {...getFieldAttrs("businessPhone", {
          ref: useMask({ mask: "(___) ___-____", replacement: { _: /\d/ } }),
        })}
      />
      <BottomNavBar
        buttonLabel="Next: Business Revenue Range"
        disabled={formik.isSubmitting}
      />
    </form>
  );
};

export default BusinessMailingAddressForm;
