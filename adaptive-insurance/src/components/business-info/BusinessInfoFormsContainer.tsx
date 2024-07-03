import React from "react";
import styled from "styled-components";
import { Formik, FormikHelpers } from "formik";
import BottomNavBar from "../common/BottomNavBar";
import { ObjectSchema } from "yup";

type Props = {
  children: React.ReactNode;
  title: string;
};

const BusinessInfoFormsContainer = (props: Props) => {
  return (
    <Container>
      <Title>{props.title}</Title>
      <p>* Required </p>
      {props.children}
    </Container>
  );
};

const Container = styled.div.attrs({
  className: "flex flex-col gap-6 w-full",
})``;

const Title = styled.p.attrs({
  className: "text-2xl md:text-4xl lg:text-5xl",
})``;

export default BusinessInfoFormsContainer;
