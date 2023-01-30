import { memo, useMemo, useState } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropTypes } from "../../prop-types/ingredienPropTypes";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = memo((props) => {
  const { bun, elements } = props;
  const total = useMemo(() => {
    let sum = 0;
    if (bun) sum += bun.price;
    if (elements.length) {
      elements.reduce(function (previousValue, item) {
        return previousValue + item.price;
      }, sum);
    }

    return sum;
  }, [bun, elements]);

  return (
    <section className={styles.section + " mt-25"}>
      <List bun={bun} innerElements={elements} />
      <CompleteOrderBlock total={total} />
    </section>
  );
});

const InnerElement = memo((props) => {
  return (
    <li className={styles.burger_component}>
      <DragIcon type='primary' />
      <ConstructorElement
        extraClass={styles.element + " ml-2"}
        text={props.item.name}
        price={props.item.price}
        thumbnail={props.item.image}
      />
    </li>
  );
});

const List = (props) => {
  const { bun, innerElements } = props;

  return (
    <div className={styles.container + " pl-4 pr-4"}>
      {bun && (
        <ConstructorElement
          extraClass={styles.element + " ml-8 mb-4 mr-4"}
          type='top'
          isLocked={true}
          text={bun.name + " (верх)"}
          price={200}
          thumbnail={bun.image}
        />
      )}
      <div className={styles.scroll_block + " custom-scroll"}>
        {innerElements.length && (
          <ul className={styles.burger_components}>
            {innerElements.map((item, index) => (
              <InnerElement key={index} item={item} />
            ))}
          </ul>
        )}
      </div>

      {bun && (
        <ConstructorElement
          extraClass={styles.element + " ml-8 mt-4 mr-4"}
          type='bottom'
          isLocked={true}
          text={bun.name + " (низ)"}
          price={200}
          thumbnail={bun.image}
        />
      )}
    </div>
  );
};

const CompleteOrderBlock = (props) => {
  const [isOpenModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const modal = (
    <Modal onClose={handleClose}>
      <OrderDetails />
    </Modal>
  );

  return (
    <div className={styles.complete_order_block + " mt-10 mr-4"}>
      <span
        className={styles.total_amount_text + " text text_type_main-large "}
      >
        {props.total}
      </span>
      <CurrencyIcon type='primary' />

      <Button
        htmlType='button'
        type='primary'
        size='large'
        extraClass='ml-10'
        onClick={handleOpen}
      >
        Нажми на меня
      </Button>
      {isOpenModal && modal}
    </div>
  );
};

BurgerConstructor.propTypes = {
  bun: ingredientPropTypes,
  elements: PropTypes.arrayOf(ingredientPropTypes),
};

List.propTypes = {
  bun: ingredientPropTypes,
  innerElements: PropTypes.arrayOf(ingredientPropTypes),
};

InnerElement.propTypes = {
  item: ingredientPropTypes,
};

CompleteOrderBlock.propTypes = {
  total: PropTypes.number,
};

export default BurgerConstructor;
