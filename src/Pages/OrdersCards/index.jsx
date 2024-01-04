import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import "./styles.css";

 function OrdersCards(props) {
  const { id, title, image, price, showDeleteIcon = true } = props;
  const context = useContext(ShoppingCartContext);

  const handleRemoveItem = () => {
    context.removeProductFromCart(id);
  };

  return (
    <div className="order-card-items">
      <div className="order-card-container">
        <div className="flex justify-between mb-2">
          {showDeleteIcon && (
            <FontAwesomeIcon
              className="text-xl cursor-pointer ml-auto text-red-600"
              icon={faTimes}
              onClick={handleRemoveItem}
            />
          )}
        </div>
        <div className="order-card-item">
          <figure className="w-20 h-20 relative group">
            <img
              className="order-image w-full h-full object-cover rounded-lg transition-transform transform cursor-pointer hover:scale-150"
              src={image}
              alt={title}
            />
          </figure>
          <p className="align-center text-sm pl-5 pr-5">{title}</p>
          <h3 className="align-center text-base font-semibold">${price}</h3>
        </div>
      </div>
    </div>
  );
}

export default OrdersCards;

OrdersCards.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  showDeleteIcon: PropTypes.bool,
};

// OrdersCards.propTypes = {
//   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   title: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   showDeleteIcon: PropTypes.bool,
// };