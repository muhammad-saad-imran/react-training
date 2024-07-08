export const businessAddressConfig: any = {
  initialValues: {
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    businessPhone: "",
  },
  inputs: {
    addressLine1: {
      label: "Address Line 1 *",
      name: "addressLine1",
    },
    addressLine2: {
      label: "Address Line 2 (Optional)",
      name: "addressLine2",
    },
    city: {
      label: "City *",
      name: "city",
    },
    state: {
      label: "State *",
      name: "state",
      as: "select",
      options: [
        {
          value: "sindh",
          label: "Sindh",
        },
        {
          value: "punjab",
          label: "Punjab",
        },
        {
          value: "kpk",
          label: "KPK",
        },
        {
          value: "balochistan",
          label: "Balochistan",
        },
        {
          value: "kashmir",
          label: "Kashmir",
        },
      ],
    },
    zip: {
      label: "Zip Code *",
      name: "zip",
    },
    country: {
      label: "Country *",
      name: "country",
    },
    businessPhone: {
      label: "Busniess Phone *",
      name: "businessPhone",
    },
  },
};
