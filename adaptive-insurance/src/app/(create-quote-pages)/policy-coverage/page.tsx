"use client";
import React, { useEffect, useState } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import moment from "moment";
import { isEmpty } from "lodash";
import {
  useCreateQuoteMutation,
  useGetQuoteQuery,
} from "@/store/api/adaptiveApiSlice";
import { ICreateQuoteParams } from "@/store/api/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBusinessInformation } from "@/store/feature/business-info";
import {
  changeCoveragePolicy,
  IPolicyCoverageState,
  selectPolicyCoverage,
} from "@/store/feature/policy-coverage";
import {
  getAddressFromQuote,
  getBusinessInfoFromQuote,
  getPolicyFromQuote,
} from "@/utils/adaptiveApiUtils";
import BottomNavBar from "@/components/common/BottomNavBar";
import InstructionModal from "@/components/policy-coverage/InstructionModal";
import PolicyCoverageUI from "@/components/policy-coverage/PolicyCoverageUI";
import Loader from "@/components/common/Loader";
import { getCoverage } from "@/utils/quoteUtils";

type Props = {};

const initCoverage = {
  coverageAmount: 10000,
  estimateId: "",
  effectiveDate: moment().add(1, "days").format("MM/DD/YY"),
};

const PolicyCoveragePage = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isModelHidden, setIsModelHidden] = useState(true);

  const quoteId = searchParams.get("quoteId") || "";

  const { data: quote, ...quoteQueryResult } = useGetQuoteQuery(quoteId);
  const [createQuote, createQuoteResult] = useCreateQuoteMutation();

  const [loading, setLoading] = useState(quote ? false : true);

  const address = getAddressFromQuote(quote);

  let createQuoteParams: ICreateQuoteParams = {
    quoteId,
    address,
    step: "coverage",
    product: "Outage",
  };

  const policy = useAppSelector(selectPolicyCoverage);

  const disableSubmit =
    quoteQueryResult.isLoading ||
    createQuoteResult.isLoading ||
    !quote?.data.quoteEstimates ||
    !quote?.data.selectedEstimateId;

  // Quotes query error handling
  if (
    quoteQueryResult.isError ||
    (!quoteQueryResult.isLoading && isEmpty(quote))
  ) {
    const error = quoteQueryResult.error;
    if (isEmpty(quote) || (error && "status" in error && error.status === 404))
      return notFound();
    else throw error;
  }

  if (quote) {
    const completed = quote.data.metadata.completed_sections;
    if (!completed.address) {
      router.push("/");
    }
  }

  // Initialize the policy state in redux that UI uses
  useEffect(() => {
    if (quote && quote.data.quoteEstimates && quote.data.selectedEstimateId) {
      const policy = getPolicyFromQuote(quote);
      const businessInfo = getBusinessInfoFromQuote(quote);
      dispatch(changeCoveragePolicy(policy));
      dispatch(setBusinessInformation(businessInfo));
      setLoading(false);
    } else if (
      quote &&
      (!quote.data.quoteEstimates || !quote.data.selectedEstimateId)
    ) {
      // init policy coverage & quote estimates
      const params = {
        ...createQuoteParams,
        coverage: initCoverage,
      };
      updatePolicy(params);
    }
  }, [quote]);

  // Updates quote estimates when coverage amount changes
  useEffect(() => {
    if (
      quote &&
      quote.data.quoteEstimates[0].coverageAmount !== policy.amount
    ) {
      const params = {
        ...createQuoteParams,
        coverage: getCoverage(policy),
      };
      updatePolicy(params);
    }
  }, [policy.amount]);

  const updatePolicy = async (params: ICreateQuoteParams) => {
    try {
      await createQuote(params);
    } catch (error: any) {
      alert("Someting went wrong. Please try again later.");
    }
  };

  async function onSubmit() {
    if (
      quote?.data.selectedEstimateId !== policy.selectedEstimateId ||
      quote?.effectiveDateUtc !== policy.effectiveDateUtc
    ) {
      try {
        const params = {
          ...createQuoteParams,
          coverage: getCoverage(policy),
        };
        await createQuote(params);
      } catch (error: any) {
        alert("Someting went wrong. Please try again later.");
        return;
      }
    }
    router.push(`/business-info/business-entity-details?quoteId=${quote?.id}`);
  }

  return (
    <>
      {loading && <Loader />}
      <PolicyCoverageUI
        onShowModal={() => setIsModelHidden(false)}
        address={address}
      />
      <BottomNavBar
        buttonLabel="Next: Business Information"
        onButtonClick={onSubmit}
        disabled={disableSubmit}
      />
      <InstructionModal
        hide={isModelHidden}
        onCloseModal={() => setIsModelHidden(true)}
      />
    </>
  );
};

export default PolicyCoveragePage;
