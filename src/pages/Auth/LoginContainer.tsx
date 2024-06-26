import React, { ReactNode } from "react";

type Props = {
  UI: any;
};

const LoginContainer = ({ UI }: Props) => {
  function onLogin(e: React.FormEvent<HTMLFormElement>) {
    console.log("Submiting form")
    const formData = new FormData(e.currentTarget);

    for(const [k, v] of formData.entries())
        console.log(k, v)

    alert(formData.entries());
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <UI onSubmit={onLogin} />
    </div>
  );
};

export default LoginContainer;
