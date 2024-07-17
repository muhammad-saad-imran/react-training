import moment from "moment";
import { find } from "lodash";
import { IAddress, ICoverage, IQuote, IQuoteEstimate } from "@/store/api/types";

export const getCoverageFromQuote = (quote: IQuote | undefined): ICoverage => {
  if (
    !quote ||
    !quote.data.quoteEstimates ||
    !quote.data.selectedEstimateId ||
    quote.data.selectedEstimateId === ""
  ) {
    return {
      coverageAmount: 10000,
      estimateId: "",
      effectiveDate: moment().add(1, "days").format("MM/DD/YY"),
    };
  }

  const selectedEstimate = find(quote.data.quoteEstimates, {
    productId: quote.data.selectedEstimateId,
  }) as IQuoteEstimate;

  return {
    coverageAmount: selectedEstimate.coverageAmount,
    estimateId: selectedEstimate.productId,
    effectiveDate: moment().add(1, "days").format("MM/DD/YY"),
  };
};

export const getAddressFromQuote = (quote: IQuote | undefined): IAddress => ({
  street: quote?.street || "",
  street2: quote?.street2 || "",
  city: quote?.city || "",
  state: quote?.state || "",
  zipCode: quote?.zipCode || "",
});
