export const purchaseConfig: any = {
  initialValues: {
    creditCardNumber: "",
    expiry: "",
    cvc: "",
  },
  inputs: {
    creditCardNumber: {
      name: "creditCardNumber",
      label: "Credit Card Number *",
    },
    expiry: {
      name: "expiry",
      label: "Expiration Date *",
    },
    cvc: {
      name: "cvc",
      label: "CVC *",
    },
  },
};
