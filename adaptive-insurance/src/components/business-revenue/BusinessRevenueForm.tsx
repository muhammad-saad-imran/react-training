import { useFormik } from "formik";
import React from "react";
import FormikInputField from "@/components//common/FormikInputField";
import BottomNavBar from "@/components//common/BottomNavBar";
import { useRouter } from "next/navigation";
import { businessRevenueSchema } from "@/validations/businessInfoValidations";
import { businessRevenueConfig } from "@/config/businessRevenueConfig";

type Props = {};

const BusinessRevenueForm = (props: Props) => {
  const router = useRouter();

  const formik = useFormik<any>({
    initialValues: businessRevenueConfig.initialValues,
    validationSchema: businessRevenueSchema,
    onSubmit: (values, { setSubmitting }) => {
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
    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
      <FormikInputField {...getFieldAttrs("revenueFrom")} />
      <FormikInputField {...getFieldAttrs("revenueTo")} />
      <BottomNavBar
        buttonLabel="Next: Review and Pay"
        disabled={formik.isSubmitting}
      />
    </form>
  );
};

export default BusinessRevenueForm;
