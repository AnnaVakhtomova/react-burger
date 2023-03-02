import logo from "../../images/logo.png";
import ModalOverlay from "../modal-overlay/model-overlay";
import styles from "./loader.module.css";
import { FC } from "react";

const Loader: FC<ILoaderProps> = (props) => {
  return (
    <div>
      <img src={logo} alt='logo' className={styles.loader} width={props.size} />
    </div>
  );
};

export const LoaderOverlay: FC<ILoaderProps> = (props) => {
  return (
    <ModalOverlay>
      <Loader size={props.size} />
    </ModalOverlay>
  );
};

interface ILoaderProps {
  size?: string;
}

export default Loader;
