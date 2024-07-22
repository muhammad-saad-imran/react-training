"use client";
import React, { useEffect, useState } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import {
  useCreateQuoteMutation,
  useGetQuoteQuery,
} from "@/store/api/adaptiveApiSlice";
import { changeCoveragePolicy } from "@/store/feature/policy-coverage";
import { useAppDispatch } from "@/store/hooks";
import { setBusinessInformation } from "@/store/feature/business-info";
import { ICreateQuoteParams } from "@/store/api/types";
import {
  getAddressFromQuote,
  getBusinessInfoFromQuote,
  getCoverageFromQuote,
  getPolicyFromQuote,
} from "@/utils/adaptiveApiUtils";
import BottomNavBar from "@/components/common/BottomNavBar";
import { Title } from "@/components/business-info/style";
import Error from "next/error";
import Loader from "@/components/common/Loader";

type Props = {};

const ReviewPage = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();

  const quoteId = searchParams.get("quoteId") || "";

  const { data: quote, ...quoteQueryResult } = useGetQuoteQuery(quoteId);
  const [createQuote, createQuoteResult] = useCreateQuoteMutation();

  const [loading, setLoading] = useState(quote ? false : true);

  const address = getAddressFromQuote(quote);
  const policy = getPolicyFromQuote(quote);
  const coverage = getCoverageFromQuote(quote);
  const businessInformation = getBusinessInfoFromQuote(quote);

  const createQuoteParams: ICreateQuoteParams = {
    quoteId,
    address,
    coverage,
    businessInformation,
    checkout: {},
    step: "checkout",
    product: "Outage",
  };

  const disableSubmit =
    quoteQueryResult.isLoading || createQuoteResult.isLoading;

  // Quotes query error handling
  if (quoteQueryResult.isError) {
    const error = quoteQueryResult.error;
    if ("data" in error && error.status === 404) return notFound();
    else throw error;
  }

  if (quote) {
    const completed = quote.data.metadata.completed_sections;
    if (!completed.address) {
      router.push("/");
    } else if (!completed.coverage) {
      router.push(`/policy-coverage?quoteId=${quoteId}`);
    } else if (!completed.businessInformation) {
      router.push(`/business-entity-details?quoteId=${quoteId}`);
    }
  }

  useEffect(() => {
    const completeQuoteCheckout = async () => {
      try {
        await createQuote(createQuoteParams);
      } catch (error: any) {
        alert("Someting went wrong. Please try again later.");
      }
    };

    if (quote) {
      const completed = quote.data.metadata.completed_sections;
      dispatch(changeCoveragePolicy(policy));
      dispatch(setBusinessInformation(businessInformation));
      if (!completed.checkout) {
        completeQuoteCheckout();
      }
      setLoading(false);
    }
  }, [quote]);

  return (
    <div>
      {loading && <Loader />}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <Title>Business Details</Title>
        </div>

        <div className="flex flex-col gap-5">
          <Title>Mailing Address</Title>
        </div>

        <div className="flex flex-col gap-5">
          <Title>Billing Address</Title>
        </div>

        <div className="flex flex-col gap-5">
          <Title>Revenue</Title>
        </div>
      </div>
      <BottomNavBar
        buttonLabel="Next: Checkout"
        disabled={disableSubmit}
        onButtonClick={() => window.open("https://www.google.com/", "_blank")}
      />
    </div>
  );
};

export default ReviewPage;
