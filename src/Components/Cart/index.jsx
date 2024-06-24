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
  //const purchase = context.purchase;

  const handleDelete = () => {
    // Clear the cart
    context.clearCart();
    // Delete the generated order
    context.deleteOrder();
    // Close the cart
    context.closeCart();
  };

  const handlePurchase = () => {
    if (context.cartProducts.length > 0) {
      context.addOrder(context.cartProducts);
      // context.clearCart(); // Remove this line if you do not want to clear the cart automatically
      navigate('/my-orders'); // Navigate to the orders page to see all orders
    } else {
      alert("No products in the cart to add to an order.");
    }
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
      <div className="flex items-center p-6">
      <div className="text-xl justify-around font-semibold text-gray-800 ml-6">
          Order
        </div>
        <div className="flex items-center justify-around w-full py-3">
          <button className="px-3 py-1 text-sm w-25 font-semibold text-white bg-gray-800 rounded hover:bg-white hover:text-gray-800 transition duration-300"
        onClick={handleDelete}
        >
          Clear Cart
        </button>
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
      <Link to="/">
        <button
          className="px-3 py-1 text-sm font-semibold text-white bg-gray-800 rounded hover:bg-white hover:text-gray-800 transition duration-300"
          onClick={context.closeCart}
        >
          Continue Shopping
        </button>
        </Link>
        <Link to="/my-order">
        <button className="px-3 py-1 text-sm w-25 font-semibold text-white bg-gray-800 rounded hover:bg-white hover:text-green-800 transition duration-300"
        onClick={handlePurchase}
        >
          Buy Now
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


//CARRITO GUARDADO RECIENTEMENTE
// import { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ShoppingCartContext } from "../../Context";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import OrderCard from "../OrderCard";
// //import PropTypes from "prop-types";
// import { totalPrice } from "../../utils";
// import "./styles.css";

// export default function Cart() {
//   const context = useContext(ShoppingCartContext);
//   const navigate = useNavigate();

//   const handleDelete = () => {
//     // Clear the cart
//     context.clearCart();
//     // Delete the generated order
//     context.deleteOrder();
//     // Close the cart
//     context.closeCart();
//   };
  
//   const handlePurchase = () => {
//     // Limpia la orden existente antes de añadir una nueva
//     context.clearOrders();
//     // Genera una nueva orden con los productos en el carrito
//     if (context.cartProducts.length > 0) {
//     context.addOrder(context.cartProducts);
//     } else {
//     alert("there are not products in the cart.");
//     return;
//     }
//     // Cierra el carrito
//     context.closeCart();
//     // Navega a la página de 'my-order'
//     navigate('/my-order');
    
//     };
    
//   return (
//     <aside
//       className={`${
//         context.isCartOpen ? "flex" : "hidden"
//       } cart-products-container scrollable-cards  flex-col fixed right-0 border border-black rounded-lg bg-white $`}
//     >
//       <div className="flex justify-between items-center p-6">
//         <h2 className="font-medium text-xl">Shopping Cart</h2>
//         <div className="">
//           <FontAwesomeIcon
//             className="text-2xl cursor-pointer"
//             icon={faTimes}
//             onClick={context.closeCart}
//           />
//         </div>
//       </div>
//       <div className="flex items-center p-6">
//       <div className="text-xl justify-around font-semibold text-gray-800 ml-6">
//           Order
//         </div>
//         <div className="flex items-center justify-around w-full py-3">
//           <button className="px-3 py-1 text-sm w-25 font-semibold text-white bg-gray-800 rounded hover:bg-white hover:text-gray-800 transition duration-300"
//         onClick={handleDelete}
//         >
//           Clear Cart
//         </button>
//           </div>
//       </div>
          
//       <div>
//         {context.cartProducts.map((product) => (
//           <OrderCard
//             key={product.id}
//             id={product.id}
//             image={product.image}
//             title={product.title}
//             price={product.price}
//           />
//         ))}
//       </div>

//       <div className="w-full py-3 px-5 mt-4">
//         <div className="flex justify-between">
//         <div className="text-lg font-bold text-gray-800">Total to Pay:</div>
//         <div className="text-lg font-semibold text-gray-800">${totalPrice(context.cartProducts)}</div>
//         </div>
//       </div>
      
//       <div className="flex items-center justify-around w-full py-3">
//       <Link to="/">
//         <button
//           className="px-3 py-1 text-sm font-semibold text-white bg-gray-800 rounded hover:bg-white hover:text-gray-800 transition duration-300"
//           onClick={context.closeCart}
//         >
//           Continue Shopping
//         </button>
//         </Link>
//         <Link to="/my-order">
//         <button className="px-3 py-1 text-sm w-25 font-semibold text-white bg-gray-800 rounded hover:bg-white hover:text-green-800 transition duration-300"
//         onClick={handlePurchase}
//         >
//           Buy Now
//         </button>
//         </Link>
//       </div>
//     </aside>
//   );
// }

// Cart.propTypes = {
//   title: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
// };
