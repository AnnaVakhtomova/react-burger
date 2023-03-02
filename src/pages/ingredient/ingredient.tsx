import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ingredient.module.css";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { getIngredients } from "../../services/actions/ingredients";
import { AppDispatch } from "../../services/actions/types";
import { RootState } from "../../services/reducers/index";
import { TIngredient } from "../../api-types";

export const IngredientPage = () => {
  const [currentIngredient, setcurrentIngredient] =
    useState<TIngredient | null>(null);

  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { ingredients } = useSelector((store: RootState) => store.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (!id) {
      setcurrentIngredient(null);
    } else {
      const ing = ingredients.find((x) => x._id === id);
      if (ing) {
        setcurrentIngredient(ing);
      } else {
        setcurrentIngredient(null);
      }
    }
  }, [ingredients, id]);

  return (
    <div className={styles.container + " mt-30"}>
      {currentIngredient && (
        <>
          <h1 className={styles.header + " text text_type_main-large"}>
            Детали ингредиента
          </h1>
          <IngredientDetails ingredient={currentIngredient} />
        </>
      )}
    </div>
  );
};
