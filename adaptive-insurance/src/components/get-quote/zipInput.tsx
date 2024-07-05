"use client";
import Button from "@/elements/buttons/Button";
import Input from "@/elements/inputs/Input";
import { useMask } from "@react-input/mask";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";
import { object, string } from "yup";
import FormikInputField from "../common/FormikInputField";
import { fork } from "child_process";

type Props = {};

const ZipInput = (props: Props) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { zip: "" },
    validationSchema: object({
      zip: string()
        .required("")
        .matches(/^[0-9]{5}$/, "Please enter valid Zip code"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      console.log("ZIP", values);
      setSubmitting(false);
      router.push("policy-coverage");
    },
  });

  const inputRef = useMask({ mask: "_____", replacement: { _: /\d/ } });

  console.log(formik.errors, "error");

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
          name="zip"
          value={formik.values.zip}
          error={formik.errors.zip}
          touched={formik.touched.zip}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          placeholder="Enter ZIP Code"
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

const Wrapper = styled.div.attrs({
  className:
    "w-full md:w-3/5 flex flex-col md:justify-center items-center gap-8 md:gap-16",
})``;

const LogoContainer = styled.div.attrs({
  className: "w-full flex flex-col items-center gap-6 md:gap-8",
})``;

const InputFormContainer = styled.form.attrs({
  className: "w-full flex flex-col items-center gap-3 md:gap-16",
})``;

export default ZipInput;