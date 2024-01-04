import Layout from "../../Components/Layout";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { useContext } from "react";
import OrdersCards from "../OrdersCards";
import Back from "../../Components/Back";
import "./styles.css";

export default function MyOrders() {
    const context = useContext(ShoppingCartContext);
   

  return (
    <Layout>
        <div>
            <Back />
        </div>
      <h1 className="mt-20">My Orders</h1>
    {
        context.order.map((order, index) => {
          <Link key={index} to="/my-orders/${order.id}">  
      <OrdersCards 
        totalPrice={order.totalPrice} 
        totalProducts={order.totalProducts} />
        </Link>
        })
      }
    </Layout>
  )
}
