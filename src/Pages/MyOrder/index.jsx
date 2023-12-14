import Layout from "../../Components/Layout";
import OrderCard from "../../Components/OrderCard";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Back from "../../Components/Back";

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  // const latestOrder = context.order?.slice(-1)[0];

  let renderFatimes;
  if (context.isCartOpen) {
    renderFatimes = (
      <FontAwesomeIcon
        className="text-2xl cursor-pointer"
        icon={faTimes}
        onClick={context.closeCart}
      />
    );
  }

  return (
    <Layout>
      <div>
        <Back />
      </div>
      <h1 className="mt-40">This is My Order</h1>

      <div className="mt-20 px-6 overflow-y-scroll flex-1">
        {context.order?.length > 0 && context.order[0]?.Products ? (
          context.order[0].Products.map((product) => (
            <OrderCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-96">
            <h2 className="text-1xl">You don&apos;t have any orders yet</h2>
          </div>
        )}
      </div>
      {renderFatimes}
    </Layout>
  );
}

export default MyOrder;