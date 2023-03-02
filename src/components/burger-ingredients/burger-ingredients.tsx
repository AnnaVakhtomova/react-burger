import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useEffect, FC } from "react";
import styles from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import {
  RESET_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT,
} from "../../services/actions/current-ingredient";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "../../services/actions/types";
import { RootState } from "../../services/reducers/index";
import { TIngredient } from "../../api-types";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("one");

  const [currentIngredient, setcurrentIngredient] =
    useState<TIngredient | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const { ingredients } = useSelector((store: RootState) => store.ingredients);

  const { id } = useParams();

  useEffect(() => {
    if (!id) setcurrentIngredient(null);
    const ing = ingredients.find((x) => x._id === id);
    if (ing) {
      setcurrentIngredient(ing);
    } else {
      setcurrentIngredient(null);
    }
  }, [ingredients, id]);

  const setCurrentClick = (tab: string) => {
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handleClose = () => {
    setcurrentIngredient(null);
    navigate(-1);
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
        setIngredient={setcurrentIngredient}
      ></Ingredients>
      {currentIngredient && (
        <Modal header='Детали ингредиента' onClose={handleClose}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </section>
  );
};

const Tabs: FC<ITabsProps> = (props) => {
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

const Ingredients: FC<IIngredientsProps> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const refBuns = useRef<HTMLHeadingElement | null>(null);
  const refSauces = useRef<HTMLHeadingElement | null>(null);
  const refMains = useRef<HTMLHeadingElement | null>(null);

  const buns = props.items.filter((x) => x.type === "bun");
  const sauces = props.items.filter((x) => x.type === "sauce");
  const mains = props.items.filter((x) => x.type === "main");

  const handleScroll = () => {
    if (
      ref.current &&
      refBuns.current &&
      refSauces.current &&
      refMains.current
    ) {
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
    }
  };

  return (
    <div
      ref={ref}
      className={styles.ingredients_container + " custom-scroll"}
      onScroll={handleScroll}
    >
      <IngredientsType
        setIngredient={props.setIngredient}
        refProp={refBuns}
        id='one'
        header='Булки'
        items={buns}
      />
      <IngredientsType
        setIngredient={props.setIngredient}
        refProp={refSauces}
        id='two'
        header='Соусы'
        items={sauces}
      />
      <IngredientsType
        setIngredient={props.setIngredient}
        refProp={refMains}
        id='three'
        header='Начинки'
        items={mains}
      />
    </div>
  );
};

const IngredientsType: FC<IIngredientsTypeProps> = (props) => {
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
          <IngredientItem
            setIngredient={props.setIngredient}
            item={item}
            key={item._id}
          />
        ))}
      </ul>
    </>
  );
};

const IngredientItem: FC<IIngredientItemProps> = (props) => {
  const { item, setIngredient } = props;
  const id = item._id;
  const count = useSelector(
    (store: RootState) => store.burgerConstructor.counters[id]
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [, ref] = useDrag({
    type: "ingredients",
    item: { id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const setCurrentIngredient = () => {
    setIngredient(item);
    navigate(`/ingredients/${item._id}`, {
      state: { modal: true },
      replace: false,
    });
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

const IngredientItemPrice: FC<IIngredientItemPriceProps> = ({ price }) => (
  <p className={styles.ingredient_item_price + " m-1"}>
    <span className='text text_type_digits-default mr-'>{price}</span>
    <CurrencyIcon type='primary' />
  </p>
);

interface ITabsProps {
  current: string;
  setCurrent: (tab: string) => void;
  onClick: (value: string) => void;
}

interface IIngredientsProps {
  items: Array<TIngredient>;
  current: string;
  setCurrent: (value: string) => void;
  setIngredient: (ingredient: TIngredient) => void;
}

interface IIngredientsTypeProps {
  id: string;
  header: string;
  items: Array<TIngredient>;
  refProp: React.MutableRefObject<HTMLHeadingElement | null>;
  setIngredient: (ingredient: TIngredient) => void;
}

interface IIngredientItemProps {
  item: TIngredient;
  setIngredient: (ingredient: TIngredient) => void;
}

interface IIngredientItemPriceProps {
  price: number;
}

export default BurgerIngredients;
