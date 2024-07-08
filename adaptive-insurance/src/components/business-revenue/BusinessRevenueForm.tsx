import { useFormik } from "formik";
import React from "react";
import FormikInputField from "@/components//common/FormikInputField";
import BottomNavBar from "@/components//common/BottomNavBar";
import { useRouter } from "next/navigation";
import { businessRevenueSchema } from "@/validations/businessInfoValidations";
import { businessRevenueConfig } from "@/config/businessRevenueConfig";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectBusinessRevenue } from "@/store/feature/business-info/hooks";
import { setBusinessRevenue } from "@/store/feature/business-info";

type Props = {};

const BusinessRevenueForm = (props: Props) => {
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
