import Layout from "../../Components/Layout";
import OrderCard from "../../Components/OrderCard";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";


function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const latestOrder = context.order?.slice(-1)[0];
  console.log(context.order?.slice(-1)[0]);
  return (
    <Layout>
    <h1 className="mt-20">This is My Order</h1>
 
   <div className="px-6 overflow-y-scroll flex-1">
   {latestOrder?.products.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
     
   </div> 
   {context.order && context.order.length === 0 && (
        <div className="flex justify-center items-center h-96">
          <h2 className="text-1xl">You don't have any orders yet</h2>
        </div>
      )}
 
</Layout>
);
  
}

export default MyOrder;


