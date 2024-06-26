import React from "react";
import Input from "../../element/input";

type Props = {
  onSubmit: any;
};

const LoginInputs = (props: Props) => {
  return (
      <form className="sm:border sm:border-black p-4 sm:p-20 w-full sm:w-auto rounded-xl flex flex-col sm:justify-center sm:items-center gap-8 sm:gap-3" onSubmit={props.onSubmit}>
        <Input type="email" label="Email" name="email" />

        <Input type="password" label="Password" name="password" />

        <button className="bg-cyan-500 px-5 py-2 rounded" type="submit">
          Login
        </button>
      </form>
  );
};

export default LoginInputs;
