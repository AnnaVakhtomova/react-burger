import logo from "../../images/logo.png";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/model-overlay";
import styles from "./loader.module.css";

const Loader = (props) => {
  return (
    <div>
      <img src={logo} alt='logo' className={styles.loader} width={props.size} />
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.string,
};

export const LoaderOverlay = (props) => {
  return (
    <ModalOverlay>
      <Loader size={props.size} />
    </ModalOverlay>
  );
};

LoaderOverlay.propTypes = {
  size: PropTypes.string,
};

export default Loader;
