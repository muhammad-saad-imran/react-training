import { useFormik } from "formik";
import React from "react";
import FormikInputField from "../common/FormikInputField";
import BottomNavBar from "../common/BottomNavBar";
import { useRouter } from "next/navigation";
import { businessRevenueSchema } from "@/validations/businessInfoValidations";

type Props = {};

const BusinessRevenueForm = (props: Props) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      revenueFrom: "",
      revenueTo: "",
    },
    validationSchema: businessRevenueSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values, "Form Values");
      setSubmitting(false);
      //   router.push("business-revenue");
    },
  });

  const inputs = [
    {
      type: "number",
      label: "Revernue From",
      name: "revenueFrom",
      value: formik.values.revenueFrom,
      error: formik.errors.revenueFrom,
      touched: formik.touched.revenueFrom,
    },
    {
      type: "number",
      label: "Revenue To",
      name: "revenueTo",
      value: formik.values.revenueTo,
      error: formik.errors.revenueTo,
      touched: formik.touched.revenueTo,
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
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
        />
      ))}
      <BottomNavBar
        buttonLabel="Next: Review and Pay"
        disabled={formik.isSubmitting}
      />
    </form>
  );
};

export default BusinessRevenueForm;
