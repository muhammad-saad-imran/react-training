"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment";
import {
  useCreateQuoteMutation,
  useGetQuoteQuery,
} from "@/store/api/adaptiveApiSlice";
import { ICreateQuoteParams } from "@/store/api/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  changeCoverageAmount,
  changeCoveragePolicy,
  changeEffectiveDate,
  changeSelectedQuoteId,
  selectPolicyCoverage,
} from "@/store/feature/policy-coverage";
import {
  getAddressFromQuote,
  getPolicyFromQuote,
} from "@/utils/adaptiveApiUtils";
import BottomNavBar from "@/components/common/BottomNavBar";
import InstructionModal from "@/components/policy-coverage/InstructionModal";
import PolicyCoverageUI from "@/components/policy-coverage/PolicyCoverageUI";
import Loader from "@/components/common/Loader";
import { find, isEmpty } from "lodash";
import { policyCoverageConfig } from "@/config/policyCoverageConfig";
import QuoteCard from "@/components/policy-coverage/QuoteCard";
import { HorizontalLine } from "@/components/policy-coverage/style";
import HourCoverage from "@/components/policy-coverage/HourCoverage";
import CoverageLimit from "@/components/policy-coverage/CoverageLimit";
import Input from "@/elements/inputs/Input";

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

  const address = getAddressFromQuote(quote);

  let createQuoteParams: ICreateQuoteParams = {
    address,
    quoteId,
    step: "coverage",
    product: "Outage",
  };

  const policy = useAppSelector(selectPolicyCoverage);
  const selectedEstimate = find(policy.quoteEstimates, {
    productId: policy.selectedEstimateId,
  });

  const loading = quoteQueryResult.isLoading;
  const disableSubmit =
    loading || !quote?.data.quoteEstimates || !quote?.data.selectedEstimateId;

  // Quotes query error handling
  if (quoteQueryResult.isError) {
    return router.push("/");
  }

  if (quote) {
    const completed = quote.data.metadata.completed_sections;
    if (!completed.address) {
      return router.push("/");
    }
  }

  // This initializes the policy state in redux that UI uses
  useEffect(() => {
    if (quote && quote.data.quoteEstimates && quote.data.selectedEstimateId) {
      const policy = getPolicyFromQuote(quote);
      dispatch(changeCoveragePolicy(policy));
    }
  }, [quote]);

  // This initializes coverage policy and updates quotes when coverage amount changes
  useEffect(() => {
    const updateSelectedPolicy = async (params: ICreateQuoteParams) => {
      try {
        await createQuote(params);
      } catch (error: any) {
        alert("Someting went wrong. Please try again later.");
      }
    };

    if (
      quote &&
      (!quote.data.quoteEstimates || !quote.data.selectedEstimateId)
    ) {
      const params = {
        ...createQuoteParams,
        coverage: initCoverage,
      };
      updateSelectedPolicy(params);
    } else if (
      quote &&
      quote.data.quoteEstimates[0].coverageAmount !== policy.amount
    ) {
      const params = {
        ...createQuoteParams,
        coverage: {
          coverageAmount: policy.amount,
          estimateId: policy.selectedEstimateId,
          effectiveDate: moment().add(1, "days").format("MM/DD/YY"),
        },
      };
      updateSelectedPolicy(params);
    }
  }, [policy.amount]);

  async function onSubmit() {
    if (
      quote?.data.selectedEstimateId !== policy.selectedEstimateId ||
      quote?.effectiveDateUtc !== policy.effectiveDateUtc
    ) {
      try {
        const params = {
          ...createQuoteParams,
          coverage: {
            coverageAmount: policy.amount,
            estimateId: policy.selectedEstimateId,
            effectiveDate: policy.effectiveDateUtc,
          },
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
        onShowModal={() => setIsModelHidden(true)}
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
