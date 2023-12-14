import Layout from "../../Components/Layout";
import OrderCard from "../../Components/OrderCard";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import Back from "../../Components/Back";

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  // const latestOrder = context.order?.slice(-1)[0];

 

  return (
    <Layout>
      <div>
        <Back />
      </div>
      <h1 className="mt-40">This is My Order</h1>

      <div className="mt-20 flex flex-col w-80">
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
            <h2 className="text-1xl">You don&apos;t have any orders yet</h2>
          </div>
        )}
        <div className="flex justify-between mt-10">
          <h2 className="text-xl font-semibold">Total to Pay:</h2>
          <h2 className="text-xl font-semibold">
            ${context.order?.length > 0 && context.order[0]?.totalPrice}
          </h2>
          </div>
      </div>
      <button className="px-3 py-1 text-sm w-40 mt-10 font-semibold text-white bg-gray-800 rounded"
          // onClick={handlePurchase}
        >
          Go To Payment
        </button>
    </Layout>
  );
}

export default MyOrder;