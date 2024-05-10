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
  
  const updateCount = () => {
    let totalCount = 0;
    cartProducts.forEach(product => {
        totalCount += product.quantity;
    });
    setCount(totalCount);

    updateCount();
};

  const removeProductFromCart = (productId) => {
    const updatedCartProducts = cartProducts.filter((product) => product.id !== productId);
    setCartProducts(updatedCartProducts);

    const newCount = updatedCartProducts.reduce((total, product) => total + product.quantity, 0);
    setCount(newCount);
  
    setCartProducts(updatedCartProducts);
    // Actualiza la orden eliminando el ítem correspondiente
    const updatedOrder = order.map((orderItem) => ({
      ...orderItem,
      Products: orderItem.Products.filter((product) => product.id !== productId)
    }));
setOrder(updatedOrder);

    // Actualiza el contador de productos
  //   const productToRemove = cartProducts.find((product) => product.id === productId);
  //   console.log("productToRemove", productToRemove);
  // if (productToRemove) {
  //   setCount((prevCount) => prevCount - productToRemove.quantity);
  // }
   };

  const clearCart = () => {
    setCartProducts([]);

    setCount(0);
  };

  const deleteOrder = () => {
    setOrder([]);
  };

  // Añadir un producto al carrito o incrementar su cantidad
  const addProductToCart = (productToAdd) => {
    const existingProduct = cartProducts.find((p) => p.id === productToAdd.id);
  
    if (existingProduct) {
      // Incrementa la cantidad si el producto ya está en el carrito
      existingProduct.quantity += 1;
    } else {
      // Añade el producto al carrito con una cantidad inicial
      setCartProducts([...cartProducts, { ...productToAdd, quantity: 1 }]);

        // Incrementa el contador
  setCount((prevCount) => prevCount + 1);
    }

     // Actualiza la orden para reflejar los cambios
     const updatedOrder = [...order];
     updatedOrder[0].Products.push({ ...productToAdd, quantity: 1 });
     setOrder(updatedOrder);
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

const addOrder = (products) => {
  // Add the new order to the existing orders
  setOrder([...order, { Products: products }]);
};


const updateOrder = () => {
  setOrder(cartProducts);
};


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
        addOrder,
        clearCart,
        updateOrder,
        deleteOrder,
        updateCount,

      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

ShoppingCartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};