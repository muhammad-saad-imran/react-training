import React from "react";
import LoginInputs from "../../components/Auth/LoginInputs";
import LoginContainer from "./LoginContainer";

type Props = {};

const Login = (props: Props) => {
  return (
    <LoginContainer  UI={LoginInputs} />
  );
};

export default Login;
