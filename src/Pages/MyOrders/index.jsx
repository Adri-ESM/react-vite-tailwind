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
      <div className="flex flex-col items-center mt-4">
        <h1 className="mt-4 mb-5 font-semibold">My Orders</h1>
      </div>
      {orders.map(order => (
        <div key={order.id} className="mb-4">
          <Link to={`/my-order/${order.id}`}>
            <OrderCard
              id={order.id}
              title={`Order ID: ${order.id}`}
              totalPrice={order.totalPrice}
              totalProducts={order.totalProducts}
              showDeleteIcon={false}
              showImage={false} 
              showDeleteOrder={false}
              showOutstandingLabel={order.status === 'Pending Payment'}
            />
          </Link>
        </div>
      ))}
       
    </Layout>
  );
}

export default MyOrders;


//MY ORDERS GUARADDO RECIENTEMENTE jueves 27 junio
// import Layout from "../../Components/Layout";
// import { Link } from "react-router-dom";
// import { ShoppingCartContext } from "../../Context";
// import { useContext } from "react";
// import OrderCard from "../../Components/OrderCard";
// import Back from "../../Components/Back";
// //import Cart from "../../Components/Cart";
// import "./styles.css";

// function MyOrders() {
//   const { orders } = useContext(ShoppingCartContext);

//   return (
//     <Layout>
//       <Back />
//       <div className="flex flex-col items-center mt-4">
//         <h1 className="mt-4 mb-5 font-semibold">My Orders</h1>
//       </div>
//       {orders.map(order => (
//         <div key={order.id} className="mb-4">
//           <Link to={`/my-orders/${order.id}`}>
//             <OrderCard
//               id={order.id}
//               title={`Order ID: ${order.id}`}
//               totalPrice={order.totalPrice}
//               totalProducts={order.totalProducts}
//               showDeleteIcon={false}
//               showImage={false} 
//               showDeleteOrder={false}
//               showOutstandingLabel={order.status === 'Pending Payment'}
//             />
//           </Link>
//         </div>
//       ))}
       
//     </Layout>
//   );
// }

// export default MyOrders;
//MY ORDERS GUARADDO RECIENTEMENTE miercoles 26 junio
// import Layout from "../../Components/Layout";
// import { Link } from "react-router-dom";
// import { ShoppingCartContext } from "../../Context";
// import { useContext } from "react";
// import OrderCard from "../../Components/OrderCard";
// import Back from "../../Components/Back";
// //import Cart from "../../Components/Cart";
// import "./styles.css";

// function MyOrders() {
//   const { orders } = useContext(ShoppingCartContext);

//   return (
//     <Layout>
//       <Back />
//       <div className="flex flex-col items-center mt-4">
//         <h1 className="mt-4 mb-5 font-semibold">My Orders</h1>
//       </div>
//       {orders.map(order => (
//         <div key={order.id} className="mb-4">
//           <Link to={`/my-orders/${order.id}`}>
//             <OrderCard
//               id={order.id}
//               title={`Order ID: ${order.id}`}
//               totalPrice={order.totalPrice}
//               totalProducts={order.totalProducts}
//               showDeleteIcon={false}
//               showImage={false} 
//               showDeleteOrder={false}
//               showOutstandingLabel={order.status === 'Pending Payment'}
//             />
//           </Link>
//         </div>
//       ))}
       
//     </Layout>
//   );
// }

// export default MyOrders;