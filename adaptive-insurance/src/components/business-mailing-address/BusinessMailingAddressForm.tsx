import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import BottomNavBar from "../common/BottomNavBar";
import FormikInputField from "../common/FormikInputField";
import { businessAddressSchema } from "@/validations/businessInfoValidations";

type Props = {};

const BusinessMailingAddressForm = (props: Props) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      businessPhone: "",
    },
    validationSchema: businessAddressSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values, "Form Values");
      setSubmitting(false);
      router.push("business-revenue");
    },
  });

  const inputs = [
    {
      type: "text",
      label: "Address Line 1 *",
      name: "addressLine1",
      value: formik.values.addressLine1,
      error: formik.errors.addressLine1,
      touched: formik.touched.addressLine1,
    },
    {
      type: "text",
      label: "Address Line 2 (Optional)",
      name: "addressLine2",
      value: formik.values.addressLine2,
      error: formik.errors.addressLine2,
      touched: formik.touched.addressLine2,
    },
    {
      type: "text",
      label: "City *",
      name: "city",
      value: formik.values.city,
      error: formik.errors.city,
      touched: formik.touched.city,
    },
    {
      type: "text",
      label: "State *",
      name: "state",
      as: "select",
      options: [
        {
          value: "sindh",
          label: "Sindh",
        },
        {
          value: "punjab",
          label: "Punjab",
        },
        {
          value: "kpk",
          label: "KPK",
        },
        {
          value: "balochistan",
          label: "Balochistan",
        },
        {
          value: "kashmir",
          label: "Kashmir",
        },
      ],
      value: formik.values.state,
      error: formik.errors.state,
      touched: formik.touched.state,
    },
    {
      type: "text",
      label: "Zip Code *",
      name: "zip",
      value: formik.values.zip,
      error: formik.errors.zip,
      touched: formik.touched.zip,
    },
    {
      type: "text",
      label: "Country *",
      name: "country",
      value: formik.values.country,
      error: formik.errors.country,
      touched: formik.touched.country,
    },
    {
      type: "text",
      label: "Busniess Phone *",
      name: "businessPhone",
      value: formik.values.businessPhone,
      error: formik.errors.businessPhone,
      touched: formik.touched.businessPhone,
    },
  ];
  return (
    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
      {inputs.map((item, index) => (
        <FormikInputField
          key={index}
          type={item.type}
          label={item.label}
          name={item.name}
          value={item.value}
          error={item.error}
          touched={item.touched}
          as={item.as}
          options={item.options}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
        />
      ))}
      <BottomNavBar
        buttonLabel="Next: Business Revenue Range"
        disabled={formik.isSubmitting}
      />
    </form>
  );
};

export default BusinessMailingAddressForm;
