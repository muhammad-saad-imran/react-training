import moment from "moment";
import { IPolicyCoverageState } from "@/store/feature/policy-coverage";

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function currencyFormat(price: number) {
  return USDollar.format(price);
}

export function getCoverage(policy: IPolicyCoverageState) {
  return {
    coverageAmount: policy.amount,
    estimateId: policy.selectedEstimateId,
    effectiveDate: getCoverageDate(policy.effectiveDateUtc),
  };
}

export function getCoverageDate(selectedUtc: string) {
  return moment
    .utc(
      !selectedUtc || selectedUtc === ""
        ? new Date().toISOString()
        : selectedUtc
    )
    .format("MM/DD/YY");
}
