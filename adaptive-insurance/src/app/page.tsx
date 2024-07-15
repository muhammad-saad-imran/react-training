"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { map } from "lodash";
import { useAutocompleteQuery } from "@/store/api/smartyStreetApiSlice";
import { useCreateQuoteMutation } from "@/store/api/adaptiveApiSlice";
import { IAddress, ICreateQuoteParams } from "@/store/api/types";
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

const initAddress: IAddress = {
  street: "",
  street2: "",
  city: "",
  state: "",
  zipCode: "",
};

export default function Home() {
  const [address, setAddress] = useState<IAddress>(initAddress);
  const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);

  const [createQuote, _] = useCreateQuoteMutation();

  const createQuoteParams: ICreateQuoteParams = {
    address,
    step: "address",
    product: "Outage",
  };

  const router = useRouter();

  const formik = useFormik({
    initialValues: getQuoteConfig.initialValues,
    validationSchema: getQuoteSchema,
    onSubmit: async (values, { setSubmitting }) => {
      createQuote(createQuoteParams)
        .then((res) => router.push(`policy-coverage?quoteId=${res.data?.id}`))
        .catch((error) => {
          alert("Something went wrong. Please try again later.");
          console.log(error, "error");
        })
        .finally(() => setSubmitting(false));
    },
  });
  const { data, isLoading } = useAutocompleteQuery(formik.values.address);

  const options = map(
    data?.suggestions,
    (item: any) =>
      `${item.street_line}, ${item.city}, ${item.state}, ${item.zipcode}`
  );

  useEffect(() => {
    !isLoading && setAutocompleteOptions(options);

    if (data?.suggestions.length === 1) {
      let { entries, zipcode, ...addr } = data?.suggestions[0];
      setAddress({
        ...addr,
        street: addr.street_line,
        street2: addr.secondary,
        zipCode: zipcode,
      });
    } else {
      setAddress(initAddress);
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
            disabled={formik.isSubmitting || address === initAddress}
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
