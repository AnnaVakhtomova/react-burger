import PropTypes from "prop-types";

export const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  type: PropTypes.oneOf(["bun", "main", "sauce"]),
  proteins: PropTypes.number,
  price: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.string,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
});
