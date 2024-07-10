import styled from "styled-components";

export const Wrapper = styled.div.attrs({
  className:
    "w-full md:w-3/5 flex flex-col md:justify-center items-center gap-8 md:gap-16",
})``;

export const LogoContainer = styled.div.attrs({
  className: "w-full flex flex-col items-center gap-6 md:gap-8",
})``;

export const InputFormContainer = styled.form.attrs({
  className: "w-full flex flex-col items-center gap-3 md:gap-16",
})``;

export const PageWrapper = styled.div.attrs({
  className: "w-full h-full flex justify-center items-center p-6",
})``;
