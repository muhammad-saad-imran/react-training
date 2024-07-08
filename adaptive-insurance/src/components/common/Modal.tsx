import CrossIcon from "@/elements/icons/CrossIcon";
import React from "react";
import styled from "styled-components";
import { IconContainer, ModalContainer, ModalWrapper } from "./style";

type Props = {
  children: React.ReactNode;
  hide: boolean;
  onCloseModal: () => void;
};

const Modal = (props: Props) => {
  return (
    <>
      {!props.hide && (
        <ModalWrapper onClick={props.onCloseModal}>
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
        </ModalWrapper>
      )}
    </>
  );
};


export default Modal;
