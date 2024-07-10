import { object, string } from "yup";

export const creditCardInfoSchema = object({
  creditCardNumber: string()
    .required("Credit Card Number is a required Field")
    .matches(
      /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/,
      "Enter valid credit card number"
    ),
  expiry: string()
    .required("Expiration date is a required Field")
    .matches(/^[0-9]{2}\/[0-9]{2}$/, "Enter valid expiration date"),
  cvc: string()
    .required("CVC is a required Field")
    .matches(/^[0-9]{3}$/, "Enter valid CVC"),
});
