import { object, string } from "yup";

export const getQuoteSchema = object({
  address: string()
    .required("")
    // .matches(/^[0-9]{5}$/, "Please enter valid Zip code"),
});
