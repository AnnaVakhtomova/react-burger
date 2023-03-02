import { FC, ReactNode } from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay: FC<IModalOverlayProps> = ({ children, onClose }) => {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (e.target === e.currentTarget) {
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      {children}
    </div>
  );
};

interface IModalOverlayProps {
  children: ReactNode;
  onClose?: () => void;
}

export default ModalOverlay;
