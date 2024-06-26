import { createContext, useState } from "react";
import PropTypes from 'prop-types';
//import { v4 as uuidv4 } from 'uuid';

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

  // const deleteOrder = () => {
  //   setOrder([]);
  // };
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
const [orderCount, setOrderCount] = useState();
const [order, setOrder] = useState([]);
const [orders, setOrders] = useState([]);



const clearOrders = () => {
  setOrder([]);
};

const generateOrderId = () => {
  const randomNumber = Math.floor(Math.random() * 1000); // Generates a random number up to 6 digits
  const date = new Date();
  const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
  return `As${randomNumber.toString().padStart(3, '0')}Ef-${formattedDate}`;
};

// const addOrder = (products) => {
//   const newOrderId = generateOrderId(); // Obtiene un nuevo ID único
//   setOrder(prevOrders => [...prevOrders, { id: newOrderId, Products: products }]);
//   // This adds the new order to the list of existing orders, each with a unique ID
// };

const addOrder = (products) => {
  if (products.length === 0) {
    console.error("No products to add to the order.");
    return;
  }
  const newOrderId = generateOrderId(); // Generates a new unique ID
  const newOrder = {
    id: newOrderId,
    Products: products,
    status: 'Pending Payment', // Default status when the order is created
    totalPrice: products.reduce((acc, p) => acc + p.price * p.quantity, 0),
    totalProducts: products.length
  };
  setOrders(prevOrders => [...prevOrders, newOrder]); // Ensure using `setOrders`
  //setCartProducts([]); // Clear the cart after adding the order
    return newOrderId; // Return the new order ID
};

const purchase = () => {
  if (cartProducts.length > 0) {
    addOrder(cartProducts); // Add the current cart products as a new order
    // The cart is cleared within addOrder
  } else {
    console.log("No products in the cart to add to an order.");
  }
};


// case 'CLEAR_ORDERS':
//     return {
//         ...state,
//         orders: []  // Limpia todas las órdenes existentes
//     };
// case 'ADD_ORDER':
//     return {
//         ...state,
//         orders: [...state.orders, { Products: action.payload }],
//         cartProducts: []  // Opcional: limpia el carrito después de hacer la orden
//     };


const updateOrder = () => {
  setOrder(cartProducts);
};

const completeOrder = (orderId) => {
  setOrder(prevOrders =>
    prevOrders.map(order =>
      order.id === orderId ? { ...order, status: 'Complete' } : order
    )
  );
};

// const deleteOrder = (orderId) => {
//   setOrder(prevOrders =>
//     prevOrders.filter(order => order.id !== orderId || order.status !== 'Complete')
//   );
// };

const deleteOrder = (orderId) => {
  setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
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
        orderCount,
        setOrderCount,
        order,
        setOrder,
        purchase,
        addOrder,
        clearCart,
        updateOrder,
        deleteOrder,
        updateCount,
        clearOrders,
        completeOrder,
        orders,
        setOrders,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

ShoppingCartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


// CONTEXT GUARDADO RECIENTEMENTE 
// import { createContext, useState } from "react";
// import PropTypes from 'prop-types';
// //import { v4 as uuidv4 } from 'uuid';

// export const ShoppingCartContext = createContext({});

// export const ShoppingCartProvider = ({ children }) => {
//   // Shooping Cart - total
//   const [shoppingCart, setShoppingCart] = useState([]);
//   const [count, setCount] = useState(0);

//   // Product Detail - open/close
//   const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
//   const openProductDetail = () => setIsProductDetailOpen(true);
//   const closeProductDetail = () => setIsProductDetailOpen(false);

//   //Product Detail - show product
//   const [productShowing, setProductShowing] = useState({});

//   //Cart add/remove/clear
//   const [cartProducts, setCartProducts] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const openCart = () => setIsCartOpen(true);
//   const closeCart = () => setIsCartOpen(false);
//   const eraserItem = (id) => {
//     const newCartProducts = cartProducts.filter((i) => i.id !== id);
//     setCartProducts(newCartProducts);
//   };
  
//   const updateCount = () => {
//     setCartProducts(currentProducts => {
//       const totalCount = currentProducts.reduce((total, product) => total + (product.quantity || 0), 0);
//       setCount(totalCount);  // Actualiza el contador basado en los productos actuales
//       return currentProducts;  // Devuelve los productos sin modificar el estado
//     });
//   };


// // ------------------- REMOVE PRODUCT FROM CART -------------------
// const removeProductFromCart = (productId) => {
//   setCartProducts(prevProducts => {
//     const updatedCartProducts = prevProducts.filter(product => product.id !== productId);
//     // Utiliza el estado actualizado inmediatamente para actualizar el contador
//     const newCount = updatedCartProducts.reduce((total, product) => total + (product.quantity || 0), 0);
//     setCount(newCount);  // Actualiza el contador basado en los productos actualizados
//     return updatedCartProducts;
//   });

//   // Asegúrate de que las órdenes también se actualicen si es necesario
//   const updatedOrder = order.map((orderItem) => ({
//     ...orderItem,
//     Products: orderItem.Products.filter((product) => product.id !== productId)
//   }));
//   setOrder(updatedOrder);

//   // Actualiza las órdenes si es necesario (simplificado para enfocarnos en el contador)
//   setOrder(prevOrder => prevOrder.filter(orderItem => orderItem.id !== productId));
// };

//   const clearCart = () => {
//     setCartProducts([]);

//     setCount(0);
//   };

//   // const deleteOrder = () => {
//   //   setOrder([]);
//   // };
// // --------------------------------------------------------

// //------------------ ADD PRODUCT TO CART ------------------
// const addProductToCart = (productToAdd) => {
//   const existingProduct = cartProducts.find(p => p.id === productToAdd.id);
//   if (existingProduct) {
//     // If the product already exists in the cart, increment its quantity
//     const newCartProducts = cartProducts.map(p =>
//       p.id === productToAdd.id ? { ...p, quantity: (p.quantity || 0) + 1 } : p
//     );
//     setCartProducts(newCartProducts);
//   } else {
//     // Add the new product with a starting quantity of 1
//     setCartProducts([...cartProducts, { ...productToAdd, quantity: 1 }]);
//   }
//   updateCount(); // Ensure to update the count after modifying the cart
// };
// //----------------------------------------------------------

// // Shooping Cart - Order
// const [orderCount, setOrderCount] = useState();
// const [order, setOrder] = useState([]);
// const [orders, setOrders] = useState([]);

// const purchase = () => {
//   const newOrder = [...cartProducts];
//   setOrder(newOrder);
//   setCartProducts([]);
//   setCount(0);
// }

// const clearOrders = () => {
//   setOrder([]);
// };

// const generateOrderId = () => {
//   const randomNumber = Math.floor(Math.random() * 1000); // Generates a random number up to 6 digits
//   const date = new Date();
//   const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
//   return `As${randomNumber.toString().padStart(3, '0')}Ef-${formattedDate}`;
// };

// // const addOrder = (products) => {
// //   const newOrderId = generateOrderId(); // Obtiene un nuevo ID único
// //   setOrder(prevOrders => [...prevOrders, { id: newOrderId, Products: products }]);
// //   // This adds the new order to the list of existing orders, each with a unique ID
// // };

// const addOrder = (products) => {
//   const newOrderId = generateOrderId(); // Generates a new unique ID
//   if (products.length === 0) {
//     console.error("No products to add to the order.");
//     return;
//   }
//   const newOrder = {
//     id: newOrderId,
//     Products: products,
//     status: 'Pending Payment', // Default status when the order is created
//     totalPrice: products.reduce((acc, p) => acc + p.price * p.quantity, 0),
//     totalProducts: products.length
//   };
//   setOrder(prevOrders => [...prevOrders, newOrder]);
// };


// // case 'CLEAR_ORDERS':
// //     return {
// //         ...state,
// //         orders: []  // Limpia todas las órdenes existentes
// //     };
// // case 'ADD_ORDER':
// //     return {
// //         ...state,
// //         orders: [...state.orders, { Products: action.payload }],
// //         cartProducts: []  // Opcional: limpia el carrito después de hacer la orden
// //     };


// const updateOrder = () => {
//   setOrder(cartProducts);
// };

// const completeOrder = (orderId) => {
//   setOrder(prevOrders =>
//     prevOrders.map(order =>
//       order.id === orderId ? { ...order, status: 'Complete' } : order
//     )
//   );
// };

// const deleteOrder = (orderId) => {
//   setOrder(prevOrders =>
//     prevOrders.filter(order => order.id !== orderId || order.status !== 'Complete')
//   );
// };

//   return (
//     <ShoppingCartContext.Provider
//       value={{
//         shoppingCart,
//         setShoppingCart,
//         count,
//         setCount,
//         isProductDetailOpen,
//         openProductDetail,
//         closeProductDetail,
//         productShowing,
//         setProductShowing,
//         cartProducts,
//         setCartProducts,
//         isCartOpen,
//         openCart,
//         closeCart,
//         eraserItem,
//         removeProductFromCart,
//         addProductToCart,
//         orderCount,
//         setOrderCount,
//         order,
//         setOrder,
//         purchase,
//         addOrder,
//         clearCart,
//         updateOrder,
//         deleteOrder,
//         updateCount,
//         clearOrders,
//         completeOrder,
//         orders,
//         setOrders,
//       }}
//     >
//       {children}
//     </ShoppingCartContext.Provider>
//   );
// };

// ShoppingCartProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };