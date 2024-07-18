import moment from "moment";
import { find } from "lodash";
import { IAddress, ICoverage, IQuote, IQuoteEstimate } from "@/store/api/types";

export const getCoverageFromQuote = (quote: IQuote | undefined): ICoverage => {
  const selectedEstimate = find(quote?.data.quoteEstimates, {
    productId: quote?.data.selectedEstimateId,
  }) as IQuoteEstimate;

  return {
    coverageAmount: selectedEstimate.coverageAmount,
    estimateId: selectedEstimate.productId,
    effectiveDate: moment.utc(quote?.effectiveDateUtc).format("MM/DD/YY"),
  };
};

export const getAddressFromQuote = (quote: IQuote | undefined): IAddress => ({
  street: quote?.street || "",
  street2: quote?.street2 || "",
  city: quote?.city || "",
  state: quote?.state || "",
  zipCode: quote?.zipCode || "",
});
