import { useContext } from "react";
import { ShoppingCartContext } from "../../Contexts/Context";
import OrderCard from "./OrderCard";

export default function OrdersList() {
  const context = useContext(ShoppingCartContext);
  const { orders, deleteOrder } = context;

  const handleDeleteOrder = (orderId) => {
    deleteOrder(orderId);
  };

  return (
    <div>
      {orders.map(order => (
        <OrderCard
          key={order.id}
          id={order.id}
          title={order.title}
          image={order.image}
          price={order.price}
          onDelete={() => handleDeleteOrder(order.id)}
        />
      ))}
    </div>
  );
}