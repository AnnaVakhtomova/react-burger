import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";
import done from "../../images/done.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../services/reducers/index";

const OrderDetails = () => {
  const { number: orderNumber } = useSelector(
    (state: RootState) => state.order.order
  );

  return (
    <div className={styles.container}>
      <h3 className={styles.order_number + " text text_type_digits-large mt-4"}>
        {orderNumber}
      </h3>
      <p className={styles.order_number_p + " text text_type_main-medium mt-8"}>
        идентификатор заказа
      </p>
      <div className={styles.done + " mt-15 mb-15"}>
        <CheckMarkIcon type='primary' />
      </div>
      <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
      <p className={styles.place + " text text_type_main-default mt-2 mb-30"}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
