"use client";
import React from "react";
import { useFormik } from "formik";
import { useMask } from "@react-input/mask";
import { purchaseConfig } from "@/config/purchaseConfig";
import { creditCardInfoSchema } from "@/validations/purchaseValidation";
import {
  BusinessFormWrapper,
  BusinessInfoPageWrapper,
  Container,
  Title,
} from "@/components/business-info/style";
import { QuoteCardWrapper } from "@/components/policy-coverage/style";
import QuoteCard from "@/components/policy-coverage/QuoteCard";
import BottomNavBar from "@/components/common/BottomNavBar";
import FormikInputField from "@/components/common/FormikInputField";

type Props = {};

const PurchasePage = (props: Props) => {
  const formik = useFormik<any>({
    initialValues: purchaseConfig.initialValues,
    validationSchema: creditCardInfoSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
    },
  });

  const getFieldAttrs = (fieldName: string, extraAttrs: any = {}) => ({
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
    value: formik.values[fieldName],
    error: formik.errors[fieldName],
    touched: formik.touched[fieldName],
    ...purchaseConfig.inputs[fieldName],
    ...extraAttrs,
  });

  return (
    <BusinessInfoPageWrapper>
      <BusinessFormWrapper>
        <Container>
          <Title>We're almost done. Here's a summary of your quote:</Title>
          <p>Enter your credit card information below.</p>
          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            <FormikInputField
              {...getFieldAttrs("creditCardNumber", {
                ref: useMask({
                  mask: "____ ____ ____ ____",
                  replacement: { _: /\d/ },
                }),
              })}
            />
            <div className="flex flex-col md:flex-row gap-5">
              <FormikInputField
                {...getFieldAttrs("expiry", {
                  ref: useMask({
                    mask: "__/__",
                    replacement: { _: /\d/ },
                  }),
                })}
              />
              <FormikInputField
                {...getFieldAttrs("cvc", {
                  ref: useMask({
                    mask: "___",
                    replacement: { _: /\d/ },
                  }),
                })}
              />
            </div>
            <BottomNavBar
              buttonLabel="Confirm Purchase"
              disabled={formik.isSubmitting}
            />
          </form>
        </Container>
      </BusinessFormWrapper>
      <QuoteCardWrapper>
        <div className="fixed right-10">
          <QuoteCard />
        </div>
      </QuoteCardWrapper>
    </BusinessInfoPageWrapper>
  );
};

export default PurchasePage;
