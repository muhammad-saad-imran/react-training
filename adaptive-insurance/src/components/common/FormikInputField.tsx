import Input from "@/elements/inputs/Input";
import SelectInput from "@/elements/inputs/SelectInput";
import React from "react";
import { ErrorMessageText, InputFieldContainer } from "./style";

type Props = {
  label?: string;
  type?: string;
  name: string;
  handleChange: any;
  handleBlur: any;
  value: string;
  placeholder?: string;
  error?: string | any;
  touched?: boolean | any;
  as?: string;
  options?: Array<{ value: string; label: string }>;
  pattern?: string;
};

const FormikInputField = React.forwardRef((props: Props, ref: any) => {
  return (
    <InputFieldContainer>
      {props.label && <p>{props.label}</p>}

      {props.as === "select" && props.options ? (
        <SelectInput
          id={props.name}
          name={props.name}
          onChange={props.handleChange}
          value={props.value}
        >
          <option disabled selected value="">
            Select
          </option>
          {props.options.map((item, index) => (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          ))}
        </SelectInput>
      ) : (
        <Input
          ref={ref}
          id={props.name}
          placeholder={props.placeholder}
          type={props.type}
          name={props.name}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.value}
        />
      )}

      {props.error && props.touched && (
        <ErrorMessageText>{props.error}</ErrorMessageText>
      )}
    </InputFieldContainer>
  );
});

export default FormikInputField;