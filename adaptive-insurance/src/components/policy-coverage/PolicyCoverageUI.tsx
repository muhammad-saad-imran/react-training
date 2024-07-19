import React, { ChangeEvent } from "react";
import { find } from "lodash";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  changeCoverageAmount,
  changeEffectiveDate,
  changeSelectedQuoteId,
  selectPolicyCoverage,
} from "@/store/feature/policy-coverage";
import { policyCoverageConfig } from "@/config/policyCoverageConfig";
import { IAddress } from "@/store/api/types";
import { HorizontalLine } from "./style";
import { InputFieldContainer } from "@/components/common/style";
import HourCoverage from "./HourCoverage";
import CoverageLimit from "./CoverageLimit";
import QuoteCard from "./QuoteCard";
import Input from "@/elements/inputs/Input";

type Props = {
  onShowModal: () => void;
  address: IAddress;
};

const PolicyCoverageUI = (props: Props) => {
  const dispatch = useAppDispatch();
  const policy = useAppSelector(selectPolicyCoverage);
  const selectedEstimate = find(policy.quoteEstimates, {
    productId: policy.selectedEstimateId,
  });

  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() + 1);
  const minDate = moment(date).format("YYYY-MM-DD");
  const valDate =
    policy.effectiveDateUtc === ""
      ? minDate
      : moment.utc(policy.effectiveDateUtc).format("YYYY-MM-DD");

  function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
    const newDate = new Date(e.currentTarget.value);
    dispatch(changeEffectiveDate(newDate.toISOString()));
  }

  return (
    <>
      <div className="md:hidden">
        <QuoteCard />
        <HorizontalLine className="my-16" />
      </div>
      <HourCoverage
        address={props.address}
        coverageQuotes={policy.quoteEstimates}
        selectedQuoteId={policy.selectedEstimateId}
        onPolicyQuoteChange={(value: string) =>
          dispatch(changeSelectedQuoteId(value))
        }
      />
      <CoverageLimit
        selectedDuration={selectedEstimate?.duration || 16}
        selectedLimit={policy.amount}
        coverageLimitOpts={policyCoverageConfig.coverageLimitOpts}
        onPolicyLimitChange={(value: number) =>
          dispatch(changeCoverageAmount(value))
        }
      />
      <InputFieldContainer className="mb-12">
        <p>Effective Date</p>
        <Input
          type="date"
          value={valDate}
          min={minDate}
          onChange={handleDateChange}
        />
      </InputFieldContainer>
      <div>
        <p
          className="font-bold underline cursor-pointer w-fit"
          onClick={props.onShowModal}
        >
          See what this means
        </p>
      </div>
    </>
  );
};

export default PolicyCoverageUI;
