import Layout from "../../Components/Layout";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { useContext } from "react";
import OrderCard from "../../Components/OrderCard";
import Back from "../../Components/Back";
//import Cart from "../../Components/Cart";
import "./styles.css";

function MyOrders() {
  const { orders } = useContext(ShoppingCartContext);

  return (
    <Layout>
      <Back />
      <h1 className="mt-20 font-semibold">My Orders</h1>
      {orders.map(order => (
        <div key={order.id} className="mb-4">
          <Link to={`/my-orders/${order.id}`}>
            <OrderCard
              id={order.id}
              title={`Order ID: ${order.id}`}
              totalPrice={order.totalPrice}
              totalProducts={order.totalProducts}
              showDeleteIcon={false}
            />
          </Link>
        </div>
      ))}
       
    </Layout>
  );
}

export default MyOrders;

//MY PRDERS GUARADDO RECIENTEMENTE
// import Layout from "../../Components/Layout";
// import { Link } from "react-router-dom";
// import { ShoppingCartContext } from "../../Context";
// import { useContext } from "react";
// import OrderCard from "../../Components/OrderCard";
// import Back from "../../Components/Back";
// //import Cart from "../../Components/Cart";
// import "./styles.css";

// function MyOrders() {
//     const context = useContext(ShoppingCartContext);
   
   
//   return (
//         <div>
//             <Back />
//         <Layout>
//       <h1 className="mt-20 font-semibold">My Orders</h1>
//     {
//         context.order.map((order) => (
//           <Link key={order.id} to="/my-orders/${order.id}">  
//           <p className="text-m mt-10 font-semibold">Order {order.id}</p>
//       <OrderCard 
//         totalPrice={order.totalPrice} 
//         totalProducts={order.totalProducts} 
//         showDeleteIcon={false} />
//         </Link>
//         ))
//       }
//     </Layout>

//     </div>
//   )
// }

// export default MyOrders;
