import { useContext } from "react";
import { ShoppingCartContext } from "../../Contexts/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import OrderCard from "../OrderCard";
import "./styles.css";

const Cart = () => {
  const context = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  const handleDelete = () => {
    context.clearCart();
    context.closeCart();
  };

  const handlePurchase = () => {
    if (context.cartProducts.length > 0) {
      const newOrderId = context.addOrder(context.cartProducts);
      if (newOrderId) {
        navigate(`/my-order/${newOrderId}`);
      }
    } else {
      alert("No products in the cart to add to an order.");
    }
  };

  return (
    <aside className={`${context.isCartOpen ? "flex" : "hidden"} cart-products-container scrollable-cards flex-col fixed right-0 border border-black rounded-lg bg-white z-20`}>
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Shopping Cart</h2>
        <div>
          <FontAwesomeIcon className="text-2xl cursor-pointer" icon={faTimes} onClick={context.closeCart} />
        </div>
      </div>
      <div className="flex items-center p-6">
        <div className="text-xl justify-around font-semibold text-gray-800 ml-6">Order</div>
        <div className="flex items-center justify-around w-full py-3">
          <button className="px-3 py-1 text-sm w-25 font-semibold text-white bg-gray-800 rounded hover:bg-white hover:text-gray-800 transition duration-300" onClick={handleDelete}>
            Clear Cart
          </button>
        </div>
      </div>
      <div>
        {context.cartProducts.map((product) => (
          <OrderCard key={product.id} id={product.id} image={product.image} title={product.title} price={product.price} />
        ))}
      </div>
      <div className="w-full py-3 px-5 mt-4">
        <div className="flex justify-between">
          <div className="text-lg font-bold text-gray-800">Total to Pay:</div>
          <div className="text-lg font-semibold text-gray-800">${context.cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2)}</div>
        </div>
      </div>
      <div className="flex items-center justify-around w-full py-3">
        <Link to="/">
          <button className="px-3 py-1 text-sm font-semibold text-white bg-gray-800 rounded hover:bg-white hover:text-gray-800 transition duration-300" onClick={context.closeCart}>
            Continue Shopping
          </button>
        </Link>
        <button className="px-3 py-1 text-sm w-25 font-semibold text-white bg-gray-800 rounded hover:bg-white hover:text-green-800 transition duration-300" onClick={handlePurchase}>
          Buy Now
        </button>
      </div>
    </aside>
  );
};

export default Cart;




// Cart.propTypes = {
//   title: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
// };


//CODIGO ORIGINAL GUARDADO PARA FUTURA REFERENCIA 3 JULIO 24
// import { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ShoppingCartContext } from "../../Context";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import OrderCard from "../OrderCard";
// import "./styles.css";

// export default function Cart() {
//   const context = useContext(ShoppingCartContext);
//   const navigate = useNavigate();

//   const handleDelete = () => {
//     context.clearCart();
//     context.closeCart();
//   };

//   const handlePurchase = () => {
//     if (context.cartProducts.length > 0) {
//       const newOrderId = context.addOrder(context.cartProducts);
//       if (newOrderId) {
//         //context.clearCart(); // Clear the cart after purchase
//         navigate(`/my-order/${newOrderId}`);
//       }
//     } else {
//       alert("No products in the cart to add to an order.");
//     }
//   };

//   return (
//     <aside className={`${context.isCartOpen ? "flex" : "hidden"} cart-products-container scrollable-cards flex-col fixed right-0 border border-black rounded-lg bg-white`}>
//       <div className="flex justify-between items-center p-6">
//         <h2 className="font-medium text-xl">Shopping Cart</h2>
//         <div>
//           <FontAwesomeIcon className="text-2xl cursor-pointer" icon={faTimes} onClick={context.closeCart} />
//         </div>
//       </div>
//       <div className="flex items-center p-6">
//         <div className="text-xl justify-around font-semibold text-gray-800 ml-6">Order</div>
//         <div className="flex items-center justify-around w-full py-3">
//           <button className="px-3 py-1 text-sm w-25 font-semibold text-white bg-gray-800 rounded hover:bg-white hover:text-gray-800 transition duration-300" onClick={handleDelete}>
//             Clear Cart
//           </button>
//         </div>
//       </div>
//       <div>
//         {context.cartProducts.map((product) => (
//           <OrderCard key={product.id} id={product.id} image={product.image} title={product.title} price={product.price} />
//         ))}
//       </div>
//       <div className="w-full py-3 px-5 mt-4">
//         <div className="flex justify-between">
//           <div className="text-lg font-bold text-gray-800">Total to Pay:</div>
//           <div className="text-lg font-semibold text-gray-800">${context.cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2)}</div>
//         </div>
//       </div>
//       <div className="flex items-center justify-around w-full py-3">
//         <Link to="/">
//           <button className="px-3 py-1 text-sm font-semibold text-white bg-gray-800 rounded hover:bg-white hover:text-gray-800 transition duration-300" onClick={context.closeCart}>
//             Continue Shopping
//           </button>
//         </Link>
//         <button className="px-3 py-1 text-sm w-25 font-semibold text-white bg-gray-800 rounded hover:bg-white hover:text-green-800 transition duration-300" onClick={handlePurchase}>
//           Buy Now
//         </button>
//       </div>
//     </aside>
//   );
// }

// Cart.propTypes = {
//   title: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
// };
