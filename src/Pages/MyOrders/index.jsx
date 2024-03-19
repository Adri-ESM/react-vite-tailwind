import Layout from "../../Components/Layout";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { useContext } from "react";
import OrdersCards from "../OrdersCards";
import OrderCard from "../../Components/OrderCard";
import Back from "../../Components/Back";
import "./styles.css";

export default function MyOrders() {
    const context = useContext(ShoppingCartContext);
   console.log(context.order);

  return (
        <div>
            <Back />
        <Layout>
      <h1 className="mt-20">My Orders</h1>
    {
        context.order.map((order, index) => {
          <Link key={index} to="/my-orders/${order.id}">  
      <OrderCard 
        totalPrice={order.totalPrice} 
        totalProducts={order.totalProducts} />
        </Link>
        })
      }
    </Layout>
    </div>
  )
}
