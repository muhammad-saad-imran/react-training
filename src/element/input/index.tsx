type PropsInputs = {
    type: string;
    label: string;
    name: string;
  };
  
  const Input = (props: PropsInputs) => {
    return (
      <div className="flex flex-col">
        <p className="text-xl">{props.label}</p>
        <input className="border border-black rounded" type={props.type} name={props.name} />
      </div>
    );
  };
  
  export default Input;