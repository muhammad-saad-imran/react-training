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
import { getAddressFromQuote } from "@/utils/adaptiveApiUtils";
import BottomNavBar from "@/components/common/BottomNavBar";
import InstructionModal from "@/components/policy-coverage/InstructionModal";
import PolicyCoverageUI from "@/components/policy-coverage/PolicyCoverageUI";

type Props = {};

const PolicyCoveragePage = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isModelHidden, setIsModelHidden] = useState(true);
  const [policyInitialized, setPolicyInitialized] = useState(false);

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
  // useEffect(() => {
  //   createQuoteParams = {
  //     ...createQuoteParams,
  //     coverage: initCoverage,
  //   };

  //   const initPolicy = async () => {
  //     if (
  //       !quote?.data.quoteEstimates ||
  //       !quote?.data.selectedEstimateId ||
  //       quote?.data.selectedEstimateId === ""
  //     ) {
  //       try {
  //         const res = await createQuote(createQuoteParams).unwrap();
  //         dispatch(
  //           changeCoveragePolicy({
  //             quoteEstimates: res.data.quoteEstimates,
  //             selectedEstimateId: res.data.selectedEstimateId,
  //             amount: res.data.quoteEstimates[0].coverageAmount,
  //           })
  //         );
  //       } catch (error) {
  //         console.log("error", error);
  //         // router.push("/");
  //       }
  //     } else {
  //       dispatch(
  //         changeCoveragePolicy({
  //           quoteEstimates: quote.data.quoteEstimates,
  //           selectedEstimateId: quote.data.selectedEstimateId,
  //           amount: quote.data.quoteEstimates[0].coverageAmount,
  //         })
  //       );
  //     }
  //   };

  //   initPolicy();
  // }, []);

  useEffect(() => {
    createQuoteParams.coverage = {
      coverageAmount: policy.amount,
      estimateId: policy.selectedEstimateId,
      effectiveDate: moment().add(1, "days").format("MM/DD/YY"),
    };

    const updatePolicyState = async () => {
      try {
        const res = await createQuote(createQuoteParams).unwrap();
        dispatch(
          changeCoveragePolicy({
            quoteEstimates: res.data.quoteEstimates,
            selectedEstimateId: res.data.selectedEstimateId,
            amount: res.data.quoteEstimates[0].coverageAmount,
          })
        );
      } catch (error: any) {
        console.log("error", error);
        // router.push("/");
      }
    };

    if (
      !quote?.data.quoteEstimates ||
      !quote?.data.selectedEstimateId ||
      quote.data.selectedEstimateId === "" ||
      (policyInitialized &&
        quote.data.quoteEstimates[0].coverageAmount !== policy.amount)
    ) {
      updatePolicyState();
    } else {
      dispatch(
        changeCoveragePolicy({
          quoteEstimates: quote.data.quoteEstimates,
          selectedEstimateId: quote.data.selectedEstimateId,
          amount: quote.data.quoteEstimates[0].coverageAmount,
        })
      );
    }
    !policyInitialized && setPolicyInitialized(true);
  }, [policy.amount]);

  console.log(policy, "policy");

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
