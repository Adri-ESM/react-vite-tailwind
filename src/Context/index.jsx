import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const ShoppingCartContext = createContext({});

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
    setCartProducts(currentProducts => {
      const totalCount = currentProducts.reduce((total, product) => total + (product.quantity || 0), 0);
      setCount(totalCount);  // Actualiza el contador basado en los productos actuales
      return currentProducts;  // Devuelve los productos sin modificar el estado
    });
  };


// ------------------- REMOVE PRODUCT FROM CART -------------------
const removeProductFromCart = (productId) => {
  setCartProducts(prevProducts => {
    const updatedCartProducts = prevProducts.filter(product => product.id !== productId);
    // Utiliza el estado actualizado inmediatamente para actualizar el contador
    const newCount = updatedCartProducts.reduce((total, product) => total + (product.quantity || 0), 0);
    setCount(newCount);  // Actualiza el contador basado en los productos actualizados
    return updatedCartProducts;
  });

  // Asegúrate de que las órdenes también se actualicen si es necesario
  const updatedOrder = order.map((orderItem) => ({
    ...orderItem,
    Products: orderItem.Products.filter((product) => product.id !== productId)
  }));
  setOrder(updatedOrder);

  // Actualiza las órdenes si es necesario (simplificado para enfocarnos en el contador)
  setOrder(prevOrder => prevOrder.filter(orderItem => orderItem.id !== productId));
};

  const clearCart = () => {
    setCartProducts([]);

    setCount(0);
  };

  const deleteOrder = () => {
    setOrder([]);
  };
// --------------------------------------------------------


//------------------ ADD PRODUCT TO CART ------------------
const addProductToCart = (productToAdd) => {
  const existingProduct = cartProducts.find(p => p.id === productToAdd.id);
  if (existingProduct) {
    // If the product already exists in the cart, increment its quantity
    const newCartProducts = cartProducts.map(p =>
      p.id === productToAdd.id ? { ...p, quantity: (p.quantity || 0) + 1 } : p
    );
    setCartProducts(newCartProducts);
  } else {
    // Add the new product with a starting quantity of 1
    setCartProducts([...cartProducts, { ...productToAdd, quantity: 1 }]);
  }
  updateCount(); // Ensure to update the count after modifying the cart
};
//----------------------------------------------------------

// Shooping Cart - Order
const [order, setOrder] = useState([]);


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
