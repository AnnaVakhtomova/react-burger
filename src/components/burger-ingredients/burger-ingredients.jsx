import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../prop-types/ingredienPropTypes";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import {
  RESET_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT,
} from "../../services/actions/current-ingredient";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("one");
  const { ingredient: currentIngredient } = useSelector(
    (store) => store.currentIngredient
  );
  const dispatch = useDispatch();
  const { ingredients } = useSelector((store) => store.ingredients);

  const setCurrentClick = (tab) => {
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView();
  };

  const handleClose = () => {
    dispatch({ type: RESET_CURRENT_INGREDIENT });
  };

  return (
    <section className={styles.section}>
      <h2 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h2>
      <Tabs
        current={current}
        setCurrent={setCurrent}
        onClick={setCurrentClick}
      ></Tabs>
      <Ingredients
        items={ingredients}
        current={current}
        setCurrent={setCurrent}
      ></Ingredients>
      {currentIngredient && (
        <Modal header='Детали ингредиента' onClose={handleClose}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </section>
  );
};

const Tabs = (props) => {
  return (
    <div className={styles.tabs + " pb-10"}>
      <Tab value='one' active={props.current === "one"} onClick={props.onClick}>
        Булки
      </Tab>
      <Tab value='two' active={props.current === "two"} onClick={props.onClick}>
        Соусы
      </Tab>
      <Tab
        value='three'
        active={props.current === "three"}
        onClick={props.onClick}
      >
        Начинки
      </Tab>
    </div>
  );
};

const Ingredients = (props) => {
  const ref = useRef(null);
  const refBuns = useRef(null);
  const refSauces = useRef(null);
  const refMains = useRef(null);

  const buns = props.items.filter((x) => x.type === "bun");
  const sauces = props.items.filter((x) => x.type === "sauce");
  const mains = props.items.filter((x) => x.type === "main");

  const handleScroll = () => {
    const containerY = ref.current.getBoundingClientRect().top;
    const bunsY = refBuns.current.getBoundingClientRect().top;
    const saucesY = refSauces.current.getBoundingClientRect().top;
    const mainsY = refMains.current.getBoundingClientRect().top;

    const distances = [
      Math.abs(containerY - bunsY),
      Math.abs(containerY - saucesY),
      Math.abs(containerY - mainsY),
    ];
    const minDistance = Math.min(...distances);
    const index = distances.indexOf(minDistance);
    switch (index) {
      case 0:
        if (props.current === "one") {
          return;
        }
        props.setCurrent("one");
        break;
      case 1:
        if (props.current === "two") {
          return;
        }
        props.setCurrent("two");
        break;
      case 2:
        if (props.current === "three") {
          return;
        }
        props.setCurrent("three");
        break;
      default:
        return;
    }
  };

  return (
    <div
      ref={ref}
      className={styles.ingredients_container + " custom-scroll"}
      onScroll={handleScroll}
    >
      <IngredientsType refProp={refBuns} id='one' header='Булки' items={buns} />
      <IngredientsType
        refProp={refSauces}
        id='two'
        header='Соусы'
        items={sauces}
      />
      <IngredientsType
        refProp={refMains}
        id='three'
        header='Начинки'
        items={mains}
      />
    </div>
  );
};

const IngredientsType = (props) => {
  return (
    <>
      <h3
        ref={props.refProp}
        className='text text_type_main-medium '
        id={props.id}
      >
        {props.header}
      </h3>
      <ul className={styles.ingredients_list + " mb-10 mt-6 ml-4 mr-4"}>
        {props.items.map((item) => (
          <IngredientItem item={item} key={item._id} />
        ))}
      </ul>
    </>
  );
};

const IngredientItem = (props) => {
  const { item } = props;
  const id = item._id;
  const count = useSelector((store) => store.burgerConstructor.counters[id]);
  const dispatch = useDispatch();

  const [, ref] = useDrag({
    type: "ingredients",
    item: { id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const setCurrentIngredient = () => {
    dispatch({ type: SET_CURRENT_INGREDIENT, ingredient: item });
  };

  return (
    <>
      <li
        ref={ref}
        className={styles.ingredient_item}
        onClick={setCurrentIngredient}
      >
        {count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
        <img className='ml-4 mr-4' src={item.image} alt={item.name} />
        <IngredientItemPrice price={item.price} />
        <p className=' text text_type_main-default'>{item.name}</p>
      </li>
    </>
  );
};

const IngredientItemPrice = ({ price }) => (
  <p className={styles.ingredient_item_price + " m-1"}>
    <span className='text text_type_digits-default mr-'>{price}</span>
    <CurrencyIcon type='primary' />
  </p>
);

Tabs.propTypes = {
  current: PropTypes.string,
  setCurrent: PropTypes.func,
  onClick: PropTypes.func,
};

Ingredients.propTypes = {
  items: PropTypes.arrayOf(ingredientPropTypes),
  current: PropTypes.string,
  setCurrent: PropTypes.func,
};

IngredientsType.propTypes = {
  id: PropTypes.string,
  header: PropTypes.string,
  items: PropTypes.arrayOf(ingredientPropTypes),
  refProp: PropTypes.object,
};

IngredientItem.propTypes = {
  item: ingredientPropTypes,
};

IngredientItemPrice.propTypes = {
  price: PropTypes.number,
};

export default BurgerIngredients;
