import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ children, onClose }) => {
  const handleClose = (e) => {
    e.stopPropagation();

    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.element,
  onClose: PropTypes.func,
};

export default ModalOverlay;
