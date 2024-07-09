"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMask } from "@react-input/mask";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectBusinessZipCode, setBusinessZipCode } from "@/store/feature/business-info";
import { getQuoteConfig } from "@/config/getQuoteConfig";
import { getQuoteSchema } from "@/validations/getQuoteValidation";
import {
  InputFormContainer,
  LogoContainer,
  PageWrapper,
  Wrapper,
} from "@/components/get-quote/style";
import Button from "@/elements/buttons/Button";
import FormikInputField from "@/components/common/FormikInputField";

export default function Home() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: getQuoteConfig.initialValues,
    validationSchema: getQuoteSchema,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(setBusinessZipCode(values.zipCode));
      setSubmitting(false);
      router.push("policy-coverage");
    },
  });

  console.log(formik.values, "formik.values")
  console.log(formik.errors, "formik.errors")

  const inputRef = useMask({ mask: "_____", replacement: { _: /\d/ } });

  return (
    <PageWrapper>
      <Wrapper>
        <LogoContainer>
          <Image
            className="size-20 md:size-24"
            src={"/logo.svg"}
            alt=""
            width={50}
            height={50}
          />
          <p className="text-3xl md:text-5xl">Get a quote in seconds</p>
        </LogoContainer>

        <InputFormContainer onSubmit={formik.handleSubmit}>
          {/* <FormikInputField
            ref={inputRef}
            value={formik.values.zipCode}
            error={formik.errors.zipCode}
            touched={formik.touched.zipCode}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            {...getQuoteConfig.inputs.zipCode}
          /> */}
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
    </PageWrapper>
  );
}
