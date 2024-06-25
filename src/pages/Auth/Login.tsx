import React from "react";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="border border-black p-4 rounded-md flex flex-col justify-center items-center ">
        <p>Email</p>
        <input type="email" />
        <p>Password</p>
        <input type="password" />
      </div>
    </div>
  );
};

export default Login;
