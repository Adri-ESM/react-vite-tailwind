import Layout from "../../Components/Layout";
import { Link } from "react-router-dom";
import OrderCard from "../../Components/OrderCard";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import Back from "../../Components/Back";
import Cart from "../../Components/Cart";

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const cartHasItems = context.order?.length > 0 && context.order[0]?.Products;
  const cartHasItems2 = context.order?.length > 0 && context.order[0]?.Products;

  const totalToPay = context.order && Array.isArray(context.order) ? 
  context.order.reduce((total, order) => {
    if (order.Products && Array.isArray(order.Products)) {
      const orderTotal = order.Products.reduce((subtotal, product) => {
        const productPrice = product.price || 0;
        return subtotal + (productPrice * product.quantity);
      }, 0);
      return total + orderTotal;
    } else {
      return total;
    }
  }, 0).toFixed(2) : "0.00"; 



  return (
    <Layout>
      <div>
        <Back />
      </div>
      <h1 className="mt-20">New Order</h1>

      <div className="mt-10 flex flex-col w-80">
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
      </div>
      <div className="flex justify-center mt-10">
        {cartHasItems2 && (
          <Link to="/">
          <button className="px-3 py-1 text-sm w-40 font-semibold text-white bg-gray-800 rounded mr-2">
            Continue Shopping
          </button>
          </Link>
        )}
        
        {cartHasItems && (
          <button className="px-3 py-1 text-sm w-40 font-semibold text-white bg-gray-800 rounded ml-2">
            Go To Payment
          </button>
        )}
      </div>

      <div className="flex justify-between mt-10 px-3 py-1 text-sm w-60 font-semibold text-white bg-gray-800 hover:bg-lime-800 rounded ml-2 hover:scale-105 hover:shadow-lg transition-transform duration-300">
      <h2 className="text-xl font-semibold mr-2">Total to Pay:</h2>
      <h2 className="text-xl font-semibold">${totalToPay}</h2>
    </div>

      <Cart />
    </Layout>
  );
}

export default MyOrder;