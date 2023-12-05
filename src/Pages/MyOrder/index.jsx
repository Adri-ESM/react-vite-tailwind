import Layout from "../../Components/Layout";
import OrderCard from "../../Components/OrderCard";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Back from "../../Components/Back";


function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const latestOrder = context.order?.slice(-1)[0];
  let renderFatimes
  if (latestOrder) {
    renderFatimes =   
    <FontAwesomeIcon
      className="text-2xl cursor-pointer"
      icon={faTimes}
      onClick={context.closeCart}
    />
  }

  return (
    <Layout>
      <div>
        <Back />
      </div>
    <h1 className="mt-40">This is My Order</h1>
 
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
   {renderFatimes}

   {context.order && context.order.length === 0 && (
        <div className="flex justify-center items-center h-96">
          <h2 className="text-1xl">You don't have any orders yet</h2>
        </div>
      )}
 
</Layout>
);
  
}

export default MyOrder;


