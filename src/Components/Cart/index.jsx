import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import OrderCard from "../OrderCard";
//import PropTypes from "prop-types";
import { totalPrice } from "../../utils";
import "./styles.css";

export default function Cart() {
  const context = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  // Función para calcular el total
// const calculateTotal = () => {
//   let total = 0;
//   context.cartProducts.forEach((product) => {
//     console.log(product.price, product.quantity);
//     if (typeof product.price === 'number' && typeof product.quantity === 'number' && product.quantity > 0) {
//       total += product.price * product.quantity;
//     }
//   });
//   return total.toFixed(2);
// };

const handlePurchase = () => {
  console.log("Before purchase");
  context.purchase();
  console.log("After purchase");
  context.closeCart();

  navigate('/my-order');
};


  return (
    <aside
      className={`${
        context.isCartOpen ? "flex" : "hidden"
      } cart-products-container scrollable-cards  flex-col fixed right-0 border border-black rounded-lg bg-white $`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Shopping Cart</h2>
        <div className="">
          <FontAwesomeIcon
            className="text-2xl cursor-pointer"
            icon={faTimes}
            onClick={context.closeCart}
          />
        </div>
      </div>
      <div>
        {context.cartProducts.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>

      <div className="w-full py-3 px-5 mt-4">
        <div className="flex justify-between">
        <div className="text-lg font-bold text-gray-800">Total to Pay:</div>
        <div className="text-lg font-semibold text-gray-800">${totalPrice(context.cartProducts)}</div>
        </div>
      </div>
      
      <div className="flex items-center justify-around w-full py-3">
        <button
          className="px-3 py-1 text-sm font-semibold text-white bg-gray-800 rounded"
          onClick={context.closeCart}
        >
          Continue Shopping
        </button>
        <Link to="/my-order">
        <button className="px-3 py-1 text-sm w-20 font-semibold text-white bg-gray-800 rounded"
        onClick={handlePurchase}
        >
          Buy
        </button>
        </Link>
      </div>
    </aside>
  );
}

// Cart.propTypes = {
//   title: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
// };

