import { useContext } from "react";
import { ShoppingCartContext } from "../../Contexts/Context";
import style from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";


const Card = (data) => {
  const context = useContext(ShoppingCartContext);
  const isProductInCart = context.cartProducts.some(product => product.id === data.data.id);
  const isProductInOrders = context.isProductInOrders(data.data.id);
  

  const showProductDetail = (productDetail) => {
    context.openProductDetail();
    context.setProductShowing(productDetail);
  };

  const handleAddProductClick = (product) => {
    if (isProductInOrders) {
      alert('This product is already in an order and cannot be added again.');
      return;
    }
    // Solo añadir el producto si no está en el carrito
    if (!isProductInCart) {
      context.addProductToCart(product);
    }
  };

  return (
    <div className="bg-white cursor-pointer w-56 h-60 mb-10">
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5 truncate">
          {data.data.category.name}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={data.data.image}
          alt=""
          onClick={() => showProductDetail(data.data)} 
        />
<div className={`absolute top-0 right-0 flex justify-center items-center w-6 h-6 rounded-full m-2 p-1 
          ${isProductInOrders ? 'bg-white hover:bg-red-600 hover:text-white' : isProductInCart ? 'bg-white hover:bg-red-600 hover:text-white' : 'bg-white hover:bg-green-500 hover:text-white'}`}>
          <FontAwesomeIcon
            icon={isProductInCart || isProductInOrders ? faTimes : faCheck}
            onClick={() => handleAddProductClick(data.data)}
          />
        </div>
      </figure>

      <p className="flex justify-between mr-2">
        <span className={`text-sm font-light truncate ${style.Card}`}>
          {data.data.title}
        </span>
        <span className="text-lg font-medium">${data.data.price}</span>
      </p>
    </div>
  );
};

export default Card;
