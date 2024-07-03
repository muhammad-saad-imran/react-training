import { object, string } from "yup";

export const businessDetailsSchema = object({
  businessType: string().required("Business Type is a required field"),
  businessName: string().required("Business Name is a required field"),
  contactName: string().required("Contact Name is a required field"),
  email: string().email().required(),
  alternateEmail: string().email("Alternative Email must be a valid email"),
  phone: string()
    .required("Phone number is a required field")
    .matches(/^[0-9]+$/, "Phone number can only contain digits")
    .min(11, "Must be exactly 11 digits")
    .max(11, "Must be exactly 11 digits"),
});
