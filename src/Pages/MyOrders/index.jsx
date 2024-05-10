import Layout from "../../Components/Layout";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { useContext } from "react";
import OrdersCards from "../../Components/OrdersCards";
import OrderCard from "../../Components/OrderCard";
import Back from "../../Components/Back";
import Cart from "../../Components/Cart";
import "./styles.css";

function MyOrders() {
    const context = useContext(ShoppingCartContext);
    console.log(context.order);
   
  return (
        <div>
            <Back />
        <Layout>
      <h1 className="mt-20">My Orders</h1>
    {
        context.order.map((order, index) => (
          <Link key={index} to="/my-orders/${index}">  
      <OrderCard 
        totalPrice={order.totalPrice} 
        totalProducts={order.totalProducts} />
        </Link>
        ))
      }
      {/* <div className="mt-20 flex flex-col w-80">
        {context.order?.length > 0 && context.order[0]?.Products ? (
          context.order[0].Products.map((product) => (
            <OrderCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              showDeleteIcon={false}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-96">
            { <h2 className="text-1xl">You don&apos;t have any orders yet</h2> }
          </div>
        )}
      
      </div> */}
       <Cart />
    </Layout>
    </div>
  )
}

export default MyOrders;
