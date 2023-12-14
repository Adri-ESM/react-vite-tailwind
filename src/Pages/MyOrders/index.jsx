import Layout from "../../Components/Layout";
//import OrderCard from "../../Components/OrderCard";
//import { useContext } from "react";
//import { ShoppingCartContext } from "../../Context";

function MyOrders() {
    //const context = useContext(ShoppingCartContext);

  return (
    <Layout>
       <h1 className="mt-20">This is My Order</h1>
      {/* <div className="px-6 overflow-y-scroll flex-1">
        {
        context.order?.slice(-1)[0](product => (
          <OrderCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))
        }
      </div> */}
        
     
      <div className="flex justify-center items-center h-96">
          <h2 className="text-1xl">You don&apos;t have any orders yet</h2>
        </div>
    
  </Layout>
  );
}

export default MyOrders;
