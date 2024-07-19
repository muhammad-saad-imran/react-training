export const businessRevenueConfig: { initialValues: any; inputs: any } = {
  initialValues: {
    revenueFrom: "",
    revenueTo: "",
  },
  inputs: {
    revenueRangeFrom: {
      type: "number",
      label: "Revernue From",
      name: "revenueRangeFrom",
    },
    revenueRangeTo: {
      type: "number",
      label: "Revenue To",
      name: "revenueRangeTo",
    },
  },
};
