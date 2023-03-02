import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/model-overlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, ReactNode } from "react";

const root = document.getElementById("react-modals");

const Modal: FC<IModalProps> = (props) => {
  const { children, header, onClose } = props;

  useEffect(() => {
    const handleEscape = (e: { key: string }) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (root) {
    return createPortal(
      <ModalOverlay onClose={onClose}>
        <div className={styles.modal}>
          <Header text={header} onClose={onClose} />
          {children}
        </div>
      </ModalOverlay>,
      root
    );
  } else {
    return null;
  }
};

const Header: FC<IHeaderProps> = ({ text, onClose }) => {
  return (
    <div className={styles.header + " mt-10 ml-10 mr-10"}>
      <h2 className={styles.header_text + " text text_type_main-large"}>
        {text}
      </h2>
      <div className={styles.close_button}>
        <CloseIcon type='primary' onClick={onClose} />
      </div>
    </div>
  );
};

interface IModalProps {
  children: ReactNode;
  header?: string;
  onClose: () => void;
}

interface IHeaderProps {
  text?: string;
  onClose: () => void;
}

export default Modal;
