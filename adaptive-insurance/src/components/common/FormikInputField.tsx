import Input from "@/elements/inputs/Input";
import SelectInput from "@/elements/inputs/SelectInput";
import { ErrorMessage } from "formik";
import React from "react";
import styled from "styled-components";

type Props = {
  label: string;
  type?: string;
  name: string;
  handleChange: any;
  handleBlur: any;
  value: string;
  error?: string;
  touched?: boolean;
  as?: string;
  options?: Array<{ value: string; label: string }>;
};

const FormikInputField = (props: Props) => {
  return (
    <Container>
      <p>{props.label}</p>

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
          id={props.name}
          type={props.type === "number" ? "text" : props.type}
          inputMode={props.type === "number" ? "numeric" : undefined}
          name={props.name}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.value}
        />
      )}

      {props.error && props.touched && (
        <ErrorMessageText>{props.error}</ErrorMessageText>
      )}
    </Container>
  );
};

const Container = styled.div.attrs({
  className: "flex flex-col gap-1 w-full",
})``;

const ErrorMessageText = styled.p.attrs({
  className: "text-rose-800 text-sm capitalize",
})``;

export default FormikInputField;
