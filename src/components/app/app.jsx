import { useEffect, useState } from "react";
import { getIngredients } from "../../api";
import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

const App = () => {
  const [state, setState] = useState({
    loading: false,
    ingredients: [],
  });

  const [stateConstructor, setStateConstructor] = useState({
    bun: null,
    elements: [],
  });

  useEffect(() => {
    const getData = async () => {
      setState({ ...state, ingredients: [], loading: true });
      const data = await getIngredients();
      setState({ ...state, ingredients: data.data, loading: false });
    };

    getData().catch((err) => {
      console.error(err);
      setState({ ...state, ingredients: [], loading: false });
    });
  }, []);

  // временно для заполнения констуктора
  useEffect(() => {
    if (state.ingredients.length) {
      const innerIngredients = state.ingredients.filter(
        (x) => x.type !== "bun"
      );
      const bun = state.ingredients.find((el) => el.type === "bun");
      setStateConstructor({ bun: bun, elements: innerIngredients });
    } else {
      setStateConstructor({ bun: null, elements: [] });
    }
  }, [state.ingredients]);

  return (
    <div className={styles.app + " text text_type_main-default"}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={state.ingredients} />
        <BurgerConstructor
          bun={stateConstructor.bun}
          elements={stateConstructor.elements}
        />
      </main>
    </div>
  );
};

export default App;
