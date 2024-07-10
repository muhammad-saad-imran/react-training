import styled from "styled-components";

const Button = styled.button<{ width?: string }>`
  background-color: #4583ff;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-align: center;
  padding: 10px 16px;
  border-radius: 6px;
  width: ${(props) => props.width};

  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 20px 30px 20px 30px;
  }
`;

export default Button;
