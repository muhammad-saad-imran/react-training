"use client";
import Button from "@/elements/buttons/Button";
import { useMask } from "@react-input/mask";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import FormikInputField from "@/components//common/FormikInputField";
import { InputFormContainer, LogoContainer, Wrapper } from "./style";
import { getQuoteConfig } from "@/config/getQuoteConfig";
import { getQuoteSchema } from "@/validations/getQuoteValidation";

type Props = {};

const ZipInput = (props: Props) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: getQuoteConfig.initialValues,
    validationSchema: getQuoteSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      router.push("policy-coverage");
    },
  });

  const inputRef = useMask({ mask: "_____", replacement: { _: /\d/ } });

  return (
    <Wrapper>
      <LogoContainer>
        <Image
          className="size-20 md:size-24"
          src={require("@/../public/logo.svg")}
          alt=""
        />
        <p className="text-3xl md:text-5xl">Get a quote in seconds</p>
      </LogoContainer>

      <InputFormContainer onSubmit={formik.handleSubmit}>
        <FormikInputField
          ref={inputRef}
          value={formik.values.zip}
          error={formik.errors.zip}
          touched={formik.touched.zip}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          {...getQuoteConfig.inputs.zip}
        />
        <Button
          className="w-full md:w-2/5 text-sm"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Get Your Quote
        </Button>
      </InputFormContainer>

      <p className="text-center md:w-2/4">
        If you have more than one location, reach out to us directly at
        123-456-7890.
      </p>
    </Wrapper>
  );
};

export default ZipInput;
