import styled from "styled-components";

const Input = styled.input`
  padding: 20px;
  border-radius: 8px;
  width: 100%;

  /* Chrome, Safari, Edge, Opera */
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  [type="number"] {
    -moz-appearance: textfield;
  }
`;

export default Input;
