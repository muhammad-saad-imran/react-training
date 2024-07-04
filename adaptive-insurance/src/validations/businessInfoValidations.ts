import { number, object, string } from "yup";

export const businessDetailsSchema = object({
  businessType: string().required("Business Type is a required field"),
  businessName: string().required("Business Name is a required field"),
  contactName: string().required("Contact Name is a required field"),
  email: string().email().required(),
  alternateEmail: string().email("Alternative Email must be a valid email"),
  phone: string()
    .required("Phone number is a required field")
    .matches(
      /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/,
      "Enter a valid phone number"
    ),
});

export const businessAddressSchema = object({
  addressLine1: string().required("Address Line 1 is a required field"),
  addressLine2: string(),
  city: string().required("City is a required field"),
  state: string().required("State is a required field"),
  zip: string()
    .required("Zip code is a required field")
    .matches(/^[0-9]+$/, "Zip code can only contain digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits"),
  country: string().required("Country is a required field"),
  businessPhone: string()
    .required("Phone number is a required field")
    .matches(
      /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/,
      "Enter a valid phone number"
    ),
});

export const businessRevenueSchema = object({
  revenueFrom: number()
    .moreThan(0, "Please enter valid revenue")
    .required("Revenue From is a required field"),
  revenueTo: number()
    .required("Revenue To is a required field")
    .when(["revenueFrom"], ([revenueFrom]) => {
      return number().moreThan(revenueFrom, "Please enter valid revenue range");
    }),
});

export const businessRevenueRange = object({});
