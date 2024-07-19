"use client";
import React, { useEffect } from "react";
import { useGetQuoteQuery } from "@/store/api/adaptiveApiSlice";
import { useRouter, useSearchParams } from "next/navigation";
import BottomNavBar from "@/components/common/BottomNavBar";
import {
  getAddressFromQuote,
  getBusinessInfoFromQuote,
  getPolicyFromQuote,
} from "@/utils/adaptiveApiUtils";
import { changeCoveragePolicy } from "@/store/feature/policy-coverage";
import { useAppDispatch } from "@/store/hooks";
import { setBusinessInformation } from "@/store/feature/business-info";

type Props = {};

const ReviewPage = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();

  const quoteId = searchParams.get("quoteId") || "";

  const { data: quote, isError } = useGetQuoteQuery(quoteId);

  const address = getAddressFromQuote(quote);
  const policy = getPolicyFromQuote(quote);
  const businessInfo = getBusinessInfoFromQuote(quote);

  // Quotes query error handling
  if (isError) {
    return router.push("/");
  }

  if (quote) {
    const completed = quote.data.metadata.completed_sections;
    if (!completed.address) {
      return router.push("/");
    } else if (!completed.coverage) {
      return router.push(`/policy-coverage?quoteId=${quoteId}`);
    } else if (!completed.businessInformation) {
      return router.push(`/business-entity-details?quoteId=${quoteId}`);
    }
  }

  useEffect(() => {
    if (quote) {
      dispatch(changeCoveragePolicy(policy));
      dispatch(setBusinessInformation(businessInfo));
    }
  }, [quote]);

  return (
    <div>
      <BottomNavBar buttonLabel="Next: Checkout" />
    </div>
  );
};

export default ReviewPage;
