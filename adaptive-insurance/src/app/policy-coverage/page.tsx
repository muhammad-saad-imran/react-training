"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment";
import {
  useCreateQuoteMutation,
  useGetQuoteQuery,
} from "@/store/api/adaptiveApiSlice";
import { ICreateQuoteParams } from "@/store/api/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  changeCoveragePolicy,
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

  const loading = quoteQueryResult.isLoading || createQuoteResult.isLoading;
  const disableSubmit =
    loading || !quote?.data.quoteEstimates || !quote?.data.selectedEstimateId;

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
  }, [quote, policy.amount]);

  async function onSubmit() {
    if (quote?.data.selectedEstimateId !== policy.selectedEstimateId) {
      try {
        const params = {
          ...createQuoteParams,
          coverage: {
            coverageAmount: policy.amount,
            estimateId: policy.selectedEstimateId,
            effectiveDate: moment().add(1, "days").format("MM/DD/YY"),
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
    <div className="pb-24">
      {loading && <Loader />}
      <PolicyCoverageUI
        onShowModal={() => setIsModelHidden((prevState) => !prevState)}
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
    </div>
  );
};

export default PolicyCoveragePage;
