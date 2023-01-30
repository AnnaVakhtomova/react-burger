import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../prop-types/ingredienPropTypes";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState("one");
  useEffect(() => {
    const element = document.getElementById(current);
    if (element) element.scrollIntoView();
  }, [current]);

  return (
    <section className={styles.section}>
      <h2 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h2>
      <Tabs current={current} setCurrent={setCurrent}></Tabs>
      <Ingredients items={props.ingredients}></Ingredients>
    </section>
  );
};

const Tabs = (props) => {
  return (
    <div className={styles.tabs + " pb-10"}>
      <Tab
        value='one'
        active={props.current === "one"}
        onClick={props.setCurrent}
      >
        Булки
      </Tab>
      <Tab
        value='two'
        active={props.current === "two"}
        onClick={props.setCurrent}
      >
        Соусы
      </Tab>
      <Tab
        value='three'
        active={props.current === "three"}
        onClick={props.setCurrent}
      >
        Начинки
      </Tab>
    </div>
  );
};

const Ingredients = (props) => {
  const buns = props.items.filter((x) => x.type === "bun");
  const sauces = props.items.filter((x) => x.type === "sauce");
  const mains = props.items.filter((x) => x.type === "main");

  return (
    <div className={styles.ingredients_container + " custom-scroll"}>
      <IngredientsType id='one' header='Булки' items={buns} />
      <IngredientsType id='two' header='Соусы' items={sauces} />
      <IngredientsType id='three' header='Начинки' items={mains} />
    </div>
  );
};

const IngredientsType = (props) => {
  return (
    <>
      <h3 className='text text_type_main-medium ' id={props.id}>
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

  const [isOpenModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <li className={styles.ingredient_item} onClick={handleOpen}>
        <Counter count={1} size='default' extraClass='m-1' />
        <img className='ml-4 mr-4' src={item.image} alt={item.name} />
        <IngredientItemPrice price={item.price} />
        <p className=' text text_type_main-default'>{item.name}</p>
      </li>
      {isOpenModal && (
        <Modal header='Детали ингредиента' onClose={handleClose}>
          <IngredientDetails ingredient={item} />
        </Modal>
      )}
    </>
  );
};

const IngredientItemPrice = ({ price }) => (
  <p className={styles.ingredient_item_price + " m-1"}>
    <span className='text text_type_digits-default mr-'>{price}</span>
    <CurrencyIcon type='primary' />
  </p>
);

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
};

Tabs.propTypes = {
  current: PropTypes.string,
  setCurrent: PropTypes.func,
};

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
};

IngredientsType.propTypes = {
  id: PropTypes.string,
  header: PropTypes.string,
  items: PropTypes.arrayOf(ingredientPropTypes),
};

IngredientItem.propTypes = {
  item: ingredientPropTypes,
};

IngredientItemPrice.propTypes = {
  price: PropTypes.number,
};

export default BurgerIngredients;
