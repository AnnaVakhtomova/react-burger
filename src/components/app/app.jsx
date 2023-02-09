import { useEffect, useState } from "react";
import { getIngredients } from "../../services/actions/ingredients";
import styles from "./app.module.css";

import { useDispatch } from "react-redux";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";

const App = () => {
  const [stateConstructor, setStateConstructor] = useState({
    bun: null,
    elements: [],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  // useEffect(() => {
  //   const getData = async () => {
  //     setState({ ...state, ingredients: [], loading: true });
  //     const data = await getIngredients();
  //     setState({ ...state, ingredients: data.data, loading: false });
  //   };

  //   getData().catch((err) => {
  //     console.error(err);
  //     setState({ ...state, ingredients: [], loading: false });
  //   });
  // }, []);

  // // временно для заполнения констуктора
  // useEffect(() => {
  //   if (state.ingredients.length) {
  //     const innerIngredients = state.ingredients.filter(
  //       (x) => x.type !== "bun"
  //     );
  //     const bun = state.ingredients.find((el) => el.type === "bun");
  //     setStateConstructor({ bun: bun, elements: innerIngredients });
  //   } else {
  //     setStateConstructor({ bun: null, elements: [] });
  //   }
  // }, [state.ingredients]);
  const { ingredients } = useSelector((store) => store.ingredients);
  const bun = ingredients.find((el) => el.type === "bun");
  const elements = []; // = ingredients.filter((x) => x.type !== "bun");
  return (
    <div className={styles.app + " text text_type_main-default"}>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor bun={bun} elements={elements} />
        </DndProvider>
      </main>
    </div>
  );
};

export default App;
