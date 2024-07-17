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
  changeQuoteEstimates,
  selectPolicyCoverage,
} from "@/store/feature/policy-coverage";
import { getAddressFromQuote } from "@/utils/adaptiveApiUtils";
import BottomNavBar from "@/components/common/BottomNavBar";
import InstructionModal from "@/components/policy-coverage/InstructionModal";
import PolicyCoverageUI from "@/components/policy-coverage/PolicyCoverageUI";

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

  const { data: quote } = useGetQuoteQuery(quoteId);
  const [createQuote, _] = useCreateQuoteMutation();
  const address = getAddressFromQuote(quote);

  const policy = useAppSelector(selectPolicyCoverage);

  let createQuoteParams: ICreateQuoteParams = {
    address,
    quoteId,
    step: "coverage",
    product: "Outage",
  };

  // This initializes the policy state in redux that UI uses
  useEffect(() => {
    if (quote && quote.data.quoteEstimates && quote.data.selectedEstimateId) {
      dispatch(
        changeCoveragePolicy({
          quoteEstimates: quote.data.quoteEstimates,
          selectedEstimateId: quote.data.selectedEstimateId,
          amount: quote.data.quoteEstimates[0].coverageAmount,
        })
      );
    }
  }, [quote]);

  useEffect(() => {
    const updateSelectedPolicy = async (params: ICreateQuoteParams) => {
      try {
        await createQuote(params);
      } catch (error: any) {
        console.log("error", error);
        // router.push("/");
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

  return (
    <div className="pb-24">
      <PolicyCoverageUI
        onShowModal={() => setIsModelHidden((prevState) => !prevState)}
      />
      <BottomNavBar
        buttonLabel="Next: Business Information"
        onButtonClick={() =>
          router.push("/business-info/business-entity-details")
        }
      />
      <InstructionModal
        hide={isModelHidden}
        onCloseModal={() => setIsModelHidden(true)}
      />
    </div>
  );
};

export default PolicyCoveragePage;
