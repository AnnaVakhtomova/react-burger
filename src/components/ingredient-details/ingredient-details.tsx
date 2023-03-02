import styles from "./ingredient-details.module.css";
import { ingredients } from "../../services/reducers/ingredients";
import { TIngredient } from "../../api-types";
import { FC } from "react";

const Nutrition = ({ name, value }: { name: string; value: number }) => {
  return (
    <div className={styles.nutrition}>
      <p className='text text_type_main-default'>{name}</p>
      <p className='text text_type_digits-default'>{value}</p>
    </div>
  );
};

const IngredientDetails: FC<IIngredientDetailsProps> = (props) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.image + " ml-4 mr-4"}
        src={props.ingredient.image}
        alt={props.ingredient.name}
      />
      <p className='text text_type_main-medium mt-4'>{props.ingredient.name}</p>
      <div className={styles.nutritions + " mt-8 mb-15"}>
        <Nutrition name='Калории,ккал' value={props.ingredient.calories} />
        <Nutrition name='Белки, г' value={props.ingredient.proteins} />
        <Nutrition name='Жиры, г' value={props.ingredient.fat} />
        <Nutrition name='Углеводы, г' value={props.ingredient.carbohydrates} />
      </div>
    </div>
  );
};

interface IIngredientDetailsProps {
  ingredient: TIngredient;
}

export default IngredientDetails;
