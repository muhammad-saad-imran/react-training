import React from "react";
import FormikInputField from "../common/FormikInputField";
import { useFormik } from "formik";
import { businessDetailsSchema } from "@/validations/businessInfoValidations";
import { useRouter } from "next/navigation";
import BottomNavBar from "../common/BottomNavBar";

type Props = {};

const BusinessEntityDetailsForm = (props: Props) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      businessType: "",
      businessName: "",
      contactName: "",
      email: "",
      alternateEmail: "",
      phone: "",
    },
    validationSchema: businessDetailsSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values, "Form Values");
      setSubmitting(false);
      router.push("business-mailing-address");
    },
  });

  const inputs = [
    {
      label: "Business Type",
      name: "businessType",
      value: formik.values.businessType,
      error: formik.errors.businessType,
      touched: formik.touched.businessType,
      as: "select",
      options: [
        {
          value: "smallBusiness",
          label: "Small Business",
        },
        {
          value: "mediumBusiness",
          label: "Medium Business",
        },
        {
          value: "largeBusiness",
          label: "Large Business",
        },
      ],
    },
    {
      type: "text",
      label: "Busniess Name *",
      name: "businessName",
      value: formik.values.businessName,
      error: formik.errors.businessName,
      touched: formik.touched.businessName,
    },
    {
      type: "text",
      label: "Contact Name *",
      name: "contactName",
      value: formik.values.contactName,
      error: formik.errors.contactName,
      touched: formik.touched.contactName,
    },
    {
      type: "email",
      label: "Email *",
      name: "email",
      value: formik.values.email,
      error: formik.errors.email,
      touched: formik.touched.email,
    },
    {
      type: "email",
      label: "Alternative Email",
      name: "alternateEmail",
      value: formik.values.alternateEmail,
      error: formik.errors.alternateEmail,
      touched: formik.touched.alternateEmail,
    },
    {
      type: "text",
      label: "Phone *",
      name: "phone",
      value: formik.values.phone,
      error: formik.errors.phone,
      touched: formik.touched.phone,
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
        buttonLabel="Next: Business Mailing Address"
        disabled={formik.isSubmitting}
      />
    </form>
  );
};

export default BusinessEntityDetailsForm;
