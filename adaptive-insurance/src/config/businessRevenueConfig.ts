export const businessRevenueConfig: { initialValues: any; inputs: any } = {
  initialValues: {
    revenueFrom: "",
    revenueTo: "",
  },
  inputs: {
    revenueFrom: {
      type: "number",
      label: "Revernue From *",
      name: "revenueFrom",
    },
    revenueTo: {
      type: "number",
      label: "Revenue To *",
      name: "revenueTo",
    },
  },
};
