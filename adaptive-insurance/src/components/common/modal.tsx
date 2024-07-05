import CrossIcon from "@/elements/icons/CrossIcon";
import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  hide: boolean;
  onCloseModal: () => void;
};

const Modal = (props: Props) => {
  return (
    <>
      {!props.hide && (
        <Wrapper onClick={props.onCloseModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <IconContainer>
              <div
                className="cursor-pointer"
                onClick={() => props.onCloseModal()}
              >
                <CrossIcon />
              </div>
            </IconContainer>
            {props.children}
          </ModalContainer>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div.attrs({
  className:
    "absolute top-0 h-screen w-screen bg-black/[0.65] flex justify-center items-center z-50",
})``;

const ModalContainer = styled.div.attrs({
  className: "bg-white rounded-lg p-10 h-full w-full md:w-fit md:h-fit",
})``;

const IconContainer = styled.div.attrs({
  className: "w-full flex justify-end",
})``;

export default Modal;
