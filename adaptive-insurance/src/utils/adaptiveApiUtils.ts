export const getCreateQuoteParams = (stage: string, extraAttrs: any) => ({
  stage,
  ...extraAttrs,
  product: "Outage",
});
