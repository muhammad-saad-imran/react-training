import React from "react";
import Modal from "../common/modal";
import Image from "next/image";

type Props = {
  hide: boolean;
  onCloseModal: () => void;
};

const InstructionModal = (props: Props) => {
  return (
    <Modal hide={props.hide} onCloseModal={props.onCloseModal}>
      <div className="flex flex-col justify-center items-center gap-10 pb-20 px-20">
        <Image
          src={require("../../../public/logo.svg")}
          alt=""
          className="size-20"
        />
        <p className="text-center">
          Based on your ZIP code and the recommended 12-hour coverage plan, our
          models predict you will receive your claim money in full 99% of the
          time.
        </p>
        <p className="text-center">
          That remaining 1% is for instances where more than 10% of the county’s
          power goes out. In which case, you’d still receive 40% of your chosen
          claim amount.
        </p>
        <p className="text-center">
          We reserve this for exceptionally rare instances that put a strain on
          our payment system. If this were to happen, Adaptive would still give
          you a 4x return on investment.
        </p>
        <div className="w-full border border-white border-t-gray"></div>
        <p className="text-gray text-center w-9/12">If you have any questions, please reach out to an agent at (123) 456-7890.</p>
      </div>
    </Modal>
  );
};

export default InstructionModal;
