import { memo, useCallback, useMemo, useRef } from "react";
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
import { useDrag, useDrop } from "react-dnd/dist/hooks";
import {
  addIngredient,
  deleteIngredient,
  moveIngredient,
} from "../../services/actions/burger-contructor";
import { useDispatch, useSelector } from "react-redux";
import { RESET_ORDER, createOrder } from "../../services/actions/order";

const BurgerConstructor = () => {
  return (
    <section className={styles.section + " mt-25"}>
      <List />
      <CompleteOrderBlock />
    </section>
  );
};

const InnerElement = memo((props) => {
  const { move } = props;
  const ref = useRef(null);
  const [{ isDrag }, dragTarget] = useDrag({
    type: "ingredients",
    item: { isMove: true, startIndex: props.index, index: props.index },
    collect: (monitor) => ({ isDrag: monitor.isDragging() }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        move(item.index, item.startIndex);
      }
    },
  });

  const [, dropTarget] = useDrop({
    accept: "ingredients",
    hover(item, monitor) {
      const currentIndex = item.index;
      const hoverIndex = props.index;
      if (currentIndex !== hoverIndex) {
        move(currentIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });

  dragTarget(dropTarget(ref));

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteIngredient(props.index));
  };

  return (
    <li ref={ref} className={styles.burger_component}>
      <DragIcon type='primary' />
      <ConstructorElement
        extraClass={styles.element + " ml-2"}
        text={props.item.name}
        price={props.item.price}
        thumbnail={props.item.image}
        handleClose={handleDelete}
      />
    </li>
  );
});

const List = () => {
  const dispatch = useDispatch();
  const { bun, elements } = useSelector((store) => store.burgerConstructor);

  const [{ canDrop }, dropTarget] = useDrop({
    accept: "ingredients",
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
    drop(item) {
      if (item.isMove) {
      } else {
        dispatch(addIngredient(item.id));
      }
    },
  });

  const move = useCallback(
    (startIndex, hoverIndex) => {
      dispatch(moveIngredient(startIndex, hoverIndex));
    },
    [dispatch]
  );

  const borderColor = canDrop ? "lightgreen" : "transparent";

  return (
    <div
      ref={dropTarget}
      className={styles.container + " pl-4 pr-4"}
      style={{ outlineColor: borderColor }}
    >
      {bun && (
        <div>
          <ConstructorElement
            extraClass={styles.element + " ml-8 mb-4 mr-4"}
            type='top'
            isLocked={true}
            text={bun.name + " (верх)"}
            price={200}
            thumbnail={bun.image}
          />
        </div>
      )}
      <div className={styles.scroll_block + " custom-scroll"}>
        {elements.length ? (
          <ul className={styles.burger_components}>
            {elements.map((item, index) => (
              <InnerElement key={index} item={item} index={index} move={move} />
            ))}
          </ul>
        ) : null}
      </div>

      {bun && (
        <div>
          <ConstructorElement
            extraClass={styles.element + " ml-8 mt-4 mr-4"}
            type='bottom'
            isLocked={true}
            text={bun.name + " (низ)"}
            price={200}
            thumbnail={bun.image}
          />
        </div>
      )}
    </div>
  );
};

const CompleteOrderBlock = () => {
  const { bun, elements } = useSelector((store) => store.burgerConstructor);
  const { order } = useSelector((store) => store.order);

  const total = useMemo(() => {
    let sum = 0;
    if (bun) sum += bun.price * 2;
    if (elements.length > 0) {
      const elementsSum = elements.reduce(function (previousValue, item) {
        return previousValue + item.price;
      }, 0);
      sum += elementsSum;
    }

    return sum;
  }, [bun, elements]);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: RESET_ORDER });
  };

  const orderCreate = () => {
    dispatch(createOrder());
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
        {total}
      </span>
      <CurrencyIcon type='primary' />

      <Button
        htmlType='button'
        type='primary'
        size='large'
        extraClass='ml-10'
        onClick={orderCreate}
        disabled={total === 0}
      >
        Нажми на меня
      </Button>
      {order && modal}
    </div>
  );
};

InnerElement.propTypes = {
  item: ingredientPropTypes,
  index: PropTypes.number,
  move: PropTypes.func,
};

export default BurgerConstructor;
