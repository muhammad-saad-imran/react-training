import React from "react";
import FormikInputField from "@/components/common/FormikInputField";
import { useFormik } from "formik";
import { businessDetailsSchema } from "@/validations/businessInfoValidations";
import { useRouter } from "next/navigation";
import { useMask } from "@react-input/mask";
import BottomNavBar from "@/components/common/BottomNavBar";
import { businessDetailsConfig } from "@/config/businessDetailsConfig";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectBusinessDetails } from "@/store/feature/business-info/hooks";
import { setBusinessDetails } from "@/store/feature/business-info";
import { IBusinessDetails } from "@/store/feature/business-info/types";

type Props = {};

const BusinessEntityDetailsForm = (props: Props) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const businessDetails = useAppSelector(selectBusinessDetails);

  const formik = useFormik<any>({
    initialValues: businessDetails,
    validationSchema: businessDetailsSchema,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(setBusinessDetails(values))
      setSubmitting(false);
      router.push("business-mailing-address");
    },
  });

  const getFieldAttrs = (fieldName: string, extraAttrs: any = {}) => ({
    ...extraAttrs,
    ...businessDetailsConfig.inputs[fieldName],
    value: formik.values[fieldName],
    error: formik.errors[fieldName],
    touched: formik.touched[fieldName],
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
      <FormikInputField {...getFieldAttrs("businessType")} />
      <FormikInputField {...getFieldAttrs("businessName")} />
      <FormikInputField {...getFieldAttrs("contactName")} />
      <FormikInputField {...getFieldAttrs("email")} />
      <FormikInputField {...getFieldAttrs("alternateEmail")} />
      <FormikInputField
        {...getFieldAttrs("phone", {
          ref: useMask({ mask: "(___) ___-____", replacement: { _: /\d/ } }),
        })}
      />
      <BottomNavBar
        buttonLabel="Next: Business Mailing Address"
        disabled={formik.isSubmitting}
      />
    </form>
  );
};

export default BusinessEntityDetailsForm;
