import { ingredientPropTypes } from "../../prop-types/ingredienPropTypes";
import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";

const Nutrition = ({ name, value }) => {
  return (
    <div className={styles.nutrition}>
      <p className='text text_type_main-default'>{name}</p>
      <p className='text text_type_digits-default'>{value}</p>
    </div>
  );
};

const IngredientDetails = (props) => {
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

IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes,
};

Nutrition.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
};

// proteins
//   fat: PropTypes.number,
//   carbohydrates: PropTypes.number,
//   calories:

export default IngredientDetails;
