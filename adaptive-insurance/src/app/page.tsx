"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import map from "lodash/map";
import { useFormik } from "formik";
import { useAutocompleteQuery } from "@/store/api/smartyStreetApiSlice";
import { getQuoteConfig } from "@/config/getQuoteConfig";
import { getQuoteSchema } from "@/validations/getQuoteValidation";
import {
  AutocompleteContainer,
  AutocompleteItems,
  AutocompleteOptions,
  InputFormContainer,
  LogoContainer,
  PageWrapper,
  Wrapper,
} from "@/components/get-quote/style";
import Image from "next/image";
import Button from "@/elements/buttons/Button";
import FormikInputField from "@/components/common/FormikInputField";
import { useCreateQuoteMutation } from "@/store/api/adaptiveApiSlice";
import { getCreateQuoteParams } from "@/utils/adaptiveApiUtils";

export default function Home() {
  const [address, setAddress] = useState<any>(null);
  const [autocompleteOptions, setAutocompleteOptions] = useState<Array<string>>(
    []
  );

  const router = useRouter();

  const formik = useFormik({
    initialValues: getQuoteConfig.initialValues,
    validationSchema: getQuoteSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await createQuote({
        address,
        stage: "address",
        product: "Outage",
      });

      if (createQuoteResult.error) {
        alert("Something went wrong. Please try again later.");
        console.log(createQuoteResult.error, "error");
      } else {
        router.push(`policy-coverage?quoteId=${"createQuoteResult.data.id"}`);
      }
      setSubmitting(false);
    },
  });

  let data = getQuoteConfig.options;
  let isLoading = false;
  // const { data, isLoading } = useAutocompleteQuery(formik.values.address);
  const [createQuote, createQuoteResult] = useCreateQuoteMutation();

  const options = map(
    data?.suggestions,
    (item: any, index: number) =>
      `${item.street_line}, ${item.city}, ${item.state}, ${item.zipcode}`
  );

  useEffect(() => {
    !isLoading && setAutocompleteOptions(options);

    if (data?.suggestions.length === 1) {
      let addr = data?.suggestions[0];
      setAddress({
        street: addr.street_line,
        street2: addr.secondary,
        city: addr.city,
        state: addr.state,
        zipCode: addr.zipcode,
      });
    } else {
      setAddress(null);
    }
  }, [data]);

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

        <InputFormContainer onSubmit={formik.handleSubmit} autoComplete="off">
          <AutocompleteContainer>
            <FormikInputField
              value={formik.values.address}
              error={formik.errors.address}
              touched={formik.touched.address}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              {...getQuoteConfig.inputs.address}
            />
            {autocompleteOptions.length > 0 &&
              autocompleteOptions[0] !== formik.values.address &&
              formik.values.address !== "" && (
                <AutocompleteItems>
                  {map(autocompleteOptions, (item: string, index: number) => (
                    <AutocompleteOptions
                      key={index}
                      onClick={() => formik.setFieldValue("address", item)}
                    >
                      {item}
                    </AutocompleteOptions>
                  ))}
                </AutocompleteItems>
              )}
          </AutocompleteContainer>
          <Button
            className="w-full md:w-2/5 text-sm"
            type="submit"
            disabled={formik.isSubmitting || address === null}
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
