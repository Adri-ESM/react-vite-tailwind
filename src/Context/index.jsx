import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const ShoppingCartContext = createContext({});
//import { useState, useEffect } from "react";

export const ShoppingCartProvider = ({ children }) => {
  // Shooping Cart - total
  const [shoppingCart, setShoppingCart] = useState([]);
  const [count, setCount] = useState(0);

  // Product Detail - open/close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  //Product Detail - show product
  const [productShowing, setProductShowing] = useState({});

  //Cart add/remove/clear
  const [cartProducts, setCartProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const eraserItem = (id) => {
    const newCartProducts = cartProducts.filter((i) => i.id !== id);
    setCartProducts(newCartProducts);
  };
  const removeProductFromCart = (productId) => {
    const itemFound = cartProducts.find((i) => i.id === productId);
    if (itemFound.quantity > 1) {
      const updatedItem = { ...itemFound };
      updatedItem.quantity -= 1;
      const updatedCartProducts = cartProducts.map((item) =>
        item.productId === productId ? updatedItem : item
      );
      setCartProducts(updatedCartProducts);
    } else {
      const updatedCartProducts = cartProducts.filter((product) => product.id !== productId);
      setCartProducts(updatedCartProducts);
    }
    setCount(count - 1);
  };

  // Añadir un producto al carrito o incrementar su cantidad
  const addProductToCart = (productToAdd) => {
    const existingProduct = cartProducts.find(p => p.id === productToAdd.id);
    
    if (existingProduct) {
        // Incrementa la cantidad si el producto ya está en el carrito
        existingProduct.quantity += 1;
    } else {
        // Añade el producto al carrito con una cantidad inicial
        setCartProducts([...cartProducts, { ...productToAdd, quantity: 1 }]);
    }
};

// Shooping Cart - Order
const [order, setOrder] = useState([]);

// const purchase = () => {
//   const newOrder = [...context.cartProducts];

//   context.dispatch({ type: ÇLEAR_CART });

//   context.dispatch({ type: SET_ORDER, payload: newOrder });
// }

const purchase = () => {
  const newOrder = [...cartProducts];
  setOrder(newOrder);
  setCartProducts([]);
  setCount(0);
}

  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCart,
        setShoppingCart,
        count,
        setCount,
        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
        productShowing,
        setProductShowing,
        cartProducts,
        setCartProducts,
        isCartOpen,
        openCart,
        closeCart,
        eraserItem,
        removeProductFromCart,
        addProductToCart,
        order,
        setOrder,
        purchase,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

ShoppingCartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};