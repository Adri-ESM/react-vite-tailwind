import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import { Link } from "react-router-dom";
import Layout from '../../Components/Layout';
import Back from '../../Components/Back';
import Cart from '../../Components/Cart';
import OrderCard from '../../Components/OrderCard';

function MyOrder() {
  const { orderId } = useParams();
  const { orders } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  // Find the specific order by ID
  const order = orders.find(o => o.id === orderId);

  useEffect(() => {
    if (!order) {
      navigate("/my-orders"); // Redirect to My Orders page if order not found
    }
  }, [order, navigate]);

  if (!order) {
    return null; // Return null while redirecting
  }

  const totalToPay = order.Products.reduce((total, product) => {
    const productPrice = product.price || 0;
    return total + (productPrice * product.quantity);
  }, 0).toFixed(2);

  return (
    <Layout>
      <div>
        <Back />
      </div>
      <h1 className="mt-20 font-semibold">Order Details</h1>
      <div className="mt-10 flex flex-col w-80">
        {order.Products.map((product, index) => (
          <OrderCard
            key={index}
            {...product}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            showDeleteIcon={false}
          />
        ))}
      </div>
      <div className="flex justify-between mt-5 px-3 py-1 text-sm w-60 font-semibold text-gray-800 bg-white rounded ml-2">
        <h2 className="text-base font-semibold mr-2">Total to Pay:</h2>
        <h2 className="text-base font-semibold">${totalToPay}</h2>
      </div>
      <div className="flex justify-center mt-5 my-20">
        <Link to="/">
          <button className="px-3 py-1 text-sm w-40 font-semibold text-white bg-gray-800 rounded mr-2 hover:bg-lime-800 hover:scale-105 hover:shadow-lg transition-transform duration-300">
            Continue Shopping
          </button>
        </Link>
        <button className="px-3 py-1 text-sm w-40 font-semibold text-white bg-gray-800 rounded ml-2 hover:bg-lime-800 hover:scale-105 hover:shadow-lg transition-transform duration-300">
          Go To Payment
        </button>
      </div>

      <Cart />
    </Layout>
  );
}

export default MyOrder;


//GUARDADO RECIENTEMENTE 3 DE JULIO 2024
// import Layout from "../../Components/Layout";
// import { Link } from "react-router-dom";
// import OrderCard from "../../Components/OrderCard";
// import { useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ShoppingCartContext } from "../../Context";
// import Back from "../../Components/Back";
// import Cart from "../../Components/Cart";

// function MyOrder() {
//   const { orderId } = useParams();
//   const { orders } = useContext(ShoppingCartContext);
//   const navigate = useNavigate();

//   // Find the specific order by ID
//   const order = orders.find(o => o.id === orderId);

//   if (!order) {
//     navigate("/my-orders"); // Redirect to My Orders page if order not found
//     return null;
//   }

//   const totalToPay = order.Products.reduce((total, product) => {
//     const productPrice = product.price || 0;
//     return total + (productPrice * product.quantity);
//   }, 0).toFixed(2);

//   return (
//     <Layout>
//       <div>
//         <Back />
//       </div>
//       <h1 className="mt-20 font-semibold">Order Details</h1>
//       <div className="mt-10 flex flex-col w-80">
//         {order.Products.map((product, index) => (
//           <OrderCard
//             key={index}
//             {...product}
//             id={product.id}
//             image={product.image}
//             title={product.title}
//             price={product.price}
//             showDeleteIcon={false}
//           />
//         ))}
//       </div>
//       <div className="flex justify-between mt-5 px-3 py-1 text-sm w-60 font-semibold text-gray-800 bg-white rounded ml-2">
//         <h2 className="text-base font-semibold mr-2">Total to Pay:</h2>
//         <h2 className="text-base font-semibold">${totalToPay}</h2>
//       </div>
//       <div className="flex justify-center mt-5 my-20">
//         <Link to="/">
//           <button className="px-3 py-1 text-sm w-40 font-semibold text-white bg-gray-800 rounded mr-2 hover:bg-lime-800 hover:scale-105 hover:shadow-lg transition-transform duration-300">
//             Continue Shopping
//           </button>
//         </Link>
//         <button className="px-3 py-1 text-sm w-40 font-semibold text-white bg-gray-800 rounded ml-2 hover:bg-lime-800 hover:scale-105 hover:shadow-lg transition-transform duration-300">
//           Go To Payment
//         </button>
//       </div>

//       <Cart />
//     </Layout>
//   );
// }

// export default MyOrder;