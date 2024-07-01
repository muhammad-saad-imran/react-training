import CrossIcon from "@/elements/icons/crossIcon";
import React, { Children } from "react";

type Props = {
  children: React.ReactNode;
  hide: boolean;
  onCloseModal: () => void;
};

const Modal = (props: Props) => {
  return (
    <div
      className={
        props.hide
          ? "hidden"
          : "" +
            "absolute top-0 h-screen w-screen bg-black/[0.65] flex justify-center items-center z-50"
      }
      onClick={props.onCloseModal}
    >
      <div
        className="w-2/3 bg-white rounded-lg p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-end">
          <div className="cursor-pointer" onClick={() => props.onCloseModal()}>
            <CrossIcon />
          </div>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
