import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import { useApiData } from '../ContextApi'; // Importa tu contexto de API

export const ShoppingCartContext = createContext({});

export const ShoppingCartProvider = ({ children }) => {
  const apiData = useApiData(); // Obtén los datos de la API desde el contexto
  // Shooping Cart - total
  const [shoppingCart, setShoppingCart] = useState([]);
  const [count, setCount] = useState(0);

  // Product Detail - open/close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // Product Detail - show product
  const [productShowing, setProductShowing] = useState({});

  // Cart add/remove/clear
  const [cartProducts, setCartProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Shooping Cart - Order
  const [orderCount, setOrderCount] = useState(0);
  const [order, setOrder] = useState([]);
  const [orders, setOrders] = useState([]);

    // Effect to load orders once on component mount
    useEffect(() => {
      const storedCartProducts = localStorage.getItem('cartProducts');
      if (storedCartProducts) {
        setCartProducts(JSON.parse(storedCartProducts));
      }
      const storedOrders = localStorage.getItem('orders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }, [cartProducts]);
  
    useEffect(() => {
      if (orders.length > 0) {
        localStorage.setItem('orders', JSON.stringify(orders));
      }
    }, [orders]);

      // Get Products By Title
  const [items, setItems] = useState([]);

  // Filtra los productos por título
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchByTitle, setSearchByTitle] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    let filtered = items;
    if (searchByTitle !== "") {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchByTitle.toLowerCase())
      );
    }
    if (sortOrder === "asc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredItems(filtered);
  }, [items, searchByTitle, sortOrder]);


    useEffect(() => {
      setItems(apiData);  // Actualiza items cuando apiData cambie
    }, [apiData]);



  const generateOrderId = () => {
    const randomNumber = Math.floor(Math.random() * 1000); // Genera un número aleatorio de hasta 3 dígitos
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2); // Obtiene los dos últimos dígitos del año
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Obtiene el mes y agrega un cero a la izquierda si es necesario
    const day = date.getDate().toString().padStart(2, '0'); // Obtiene el día y agrega un cero a la izquierda si es necesario
    const formattedDate = `${year}${month}${day}`; // Formatea la fecha
    return `As${randomNumber.toString().padStart(3, '0')}Ef-${formattedDate}`; // Devuelve el ID de la orden
  };

  const updateCount = (products) => {
    const totalCount = products.reduce((total, product) => total + (product.quantity || 0), 0);
    setCount(totalCount);
  };

  const handleCartActions = (actionType, payload) => {
    switch (actionType) {
      case 'ADD_PRODUCT': {
        const existingProduct = cartProducts.find(p => p.id === payload.id);
        let newCartProducts;
        if (existingProduct) {
          newCartProducts = cartProducts.map(p =>
            p.id === payload.id ? { ...p, quantity: (p.quantity || 0) + 1 } : p
          );
        } else {
          newCartProducts = [...cartProducts, { ...payload, quantity: 1 }];
        }
        setCartProducts(newCartProducts);
        updateCount(newCartProducts);
        break;
      }
      case 'REMOVE_PRODUCT': {
        const updatedCartProducts = cartProducts.filter(product => product.id !== payload);
        setCartProducts(updatedCartProducts);
        updateCount(updatedCartProducts);
        break;
      }
      case 'ERASE_ITEM': {
        const newCartProducts = cartProducts.filter((i) => i.id !== payload.id);
        setCartProducts(newCartProducts);
        updateCount(newCartProducts);
        break;
      }
      case 'CLEAR_CART': {
        setCartProducts([]);
        setCount(0);
        break;
      }
      default:
        break;
    }
  };

  const handleOrderActions = (actionType, payload) => {
    switch (actionType) {
      case 'ADD_ORDER': {
        if (payload.length === 0) return null;
        const newOrderId = generateOrderId();
        const newOrder = {
          id: newOrderId,
          Products: payload,
          status: 'Pending Payment',
          totalPrice: payload.reduce((acc, p) => acc + p.price * p.quantity, 0),
          totalProducts: payload.length
        };
        setOrders([newOrder, ...orders]);
        setCartProducts([]);
        setCount(0);
        return newOrderId;
      }
      case 'DELETE_ORDER': {
        const updatedOrders = orders.filter(order => order.id !== payload);
        setOrders(updatedOrders);
        break;
      }
      case 'CLEAR_ORDERS': {
        setOrders([]);
        break;
      }
      case 'COMPLETE_ORDER': {
        const updatedOrders = orders.map(order =>
          order.id === payload ? { ...order, status: 'Complete' } : order
        );
        setOrders(updatedOrders);
        break;
      }
      default:
        break;
    }
  };

  const addProductToCart = (productToAdd) => {
    if (isProductInOrders(productToAdd.id)) {
      alert('This product is already in an order and cannot be added again.');
      return;
    }
    handleCartActions('ADD_PRODUCT', productToAdd);
  };

  const removeProductFromCart = (productId) => handleCartActions('REMOVE_PRODUCT', productId);
  const eraserItem = (id) => handleCartActions('ERASE_ITEM', id);
  const clearCart = () => handleCartActions('CLEAR_CART');

  const addOrder = (products) => handleOrderActions('ADD_ORDER', products);
  const deleteOrder = (orderId) => handleOrderActions('DELETE_ORDER', orderId);
  const clearOrders = () => handleOrderActions('CLEAR_ORDERS');
  const completeOrder = (orderId) => handleOrderActions('COMPLETE_ORDER', orderId);

  const isProductInOrders = (productId) => {
    return orders.some(order => order.Products.some(product => product.id === productId));
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        products: apiData,
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
        purchase: () => addOrder(cartProducts),
        addOrder,
        clearCart,
        updateOrder: () => setOrder(cartProducts),
        deleteOrder,
        updateCount,
        clearOrders,
        completeOrder,
        orders,
        setOrders,
        isProductInOrders,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        setFilteredItems,
        sortOrder,
        setSortOrder,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

ShoppingCartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShoppingCartProvider;



//NUEVA VERSIÓN CON SWITCH CASE GUARDADA RECIENTEMENTE 3 JULIO 24
// import { createContext, useState, useEffect } from "react";
// import PropTypes from 'prop-types';
// import { useApiData } from '../ContextApi'; // Importa tu contexto de API

// export const ShoppingCartContext = createContext({});

// export const ShoppingCartProvider = ({ children }) => {
//   const apiData = useApiData(); // Obtén los datos de la API desde el contexto
//   // Shooping Cart - total
//   const [shoppingCart, setShoppingCart] = useState([]);
//   const [count, setCount] = useState(0);

//   // Product Detail - open/close
//   const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
//   const openProductDetail = () => setIsProductDetailOpen(true);
//   const closeProductDetail = () => setIsProductDetailOpen(false);

//   // Product Detail - show product
//   const [productShowing, setProductShowing] = useState({});

//   // Cart add/remove/clear
//   const [cartProducts, setCartProducts] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const openCart = () => setIsCartOpen(true);
//   const closeCart = () => setIsCartOpen(false);

//   // Shooping Cart - Order
//   const [orderCount, setOrderCount] = useState(0);
//   const [order, setOrder] = useState([]);
//   const [orders, setOrders] = useState([]);

//   // Get Products By Title
//   const [items, setItems] = useState([]);
//   const [search, setSearch] = useState("");

//     // Effect to load orders once on component mount
//     useEffect(() => {
//       const storedCartProducts = localStorage.getItem('cartProducts');
//       if (storedCartProducts) {
//         setCartProducts(JSON.parse(storedCartProducts));
//       }
//       const storedOrders = localStorage.getItem('orders');
//       if (storedOrders) {
//         setOrders(JSON.parse(storedOrders));
//       }
//     }, []);
  
//     useEffect(() => {
//       localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
//     }, [cartProducts]);
  
//     useEffect(() => {
//       if (orders.length > 0) {
//         localStorage.setItem('orders', JSON.stringify(orders));
//       }
//     }, [orders]);
  


//   const generateOrderId = () => {
//     const randomNumber = Math.floor(Math.random() * 1000); // Genera un número aleatorio de hasta 3 dígitos
//     const date = new Date();
//     const year = date.getFullYear().toString().slice(-2); // Obtiene los dos últimos dígitos del año
//     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Obtiene el mes y agrega un cero a la izquierda si es necesario
//     const day = date.getDate().toString().padStart(2, '0'); // Obtiene el día y agrega un cero a la izquierda si es necesario
//     const formattedDate = `${year}${month}${day}`; // Formatea la fecha
//     return `As${randomNumber.toString().padStart(3, '0')}Ef-${formattedDate}`; // Devuelve el ID de la orden
//   };

//   // const updateCount = () => {
//   //   setCartProducts(currentProducts => {
//   //     const totalCount = currentProducts.reduce((total, product) => total + (product.quantity || 0), 0);
//   //     setCount(totalCount);  // Actualiza el contador basado en los productos actuales
//   //     return currentProducts;  // Devuelve los productos sin modificar el estado
//   //   });
//   // };

//   const updateCount = (products) => {
//     const totalCount = products.reduce((total, product) => total + (product.quantity || 0), 0);
//     setCount(totalCount);
//   };

//   const handleCartActions = (actionType, payload) => {
//     switch (actionType) {
//       case 'ADD_PRODUCT': {
//         const existingProduct = cartProducts.find(p => p.id === payload.id);
//         let newCartProducts;
//         if (existingProduct) {
//           newCartProducts = cartProducts.map(p =>
//             p.id === payload.id ? { ...p, quantity: (p.quantity || 0) + 1 } : p
//           );
//         } else {
//           newCartProducts = [...cartProducts, { ...payload, quantity: 1 }];
//         }
//         setCartProducts(newCartProducts);
//         updateCount(newCartProducts);
//         break;
//       }
//       case 'REMOVE_PRODUCT': {
//         const updatedCartProducts = cartProducts.filter(product => product.id !== payload);
//         setCartProducts(updatedCartProducts);
//         updateCount(updatedCartProducts);
//         break;
//       }
//       case 'ERASE_ITEM': {
//         const newCartProducts = cartProducts.filter((i) => i.id !== payload.id);
//         setCartProducts(newCartProducts);
//         updateCount(newCartProducts);
//         break;
//       }
//       case 'CLEAR_CART': {
//         setCartProducts([]);
//         setCount(0);
//         break;
//       }
//       default:
//         break;
//     }
//   };

//   const handleOrderActions = (actionType, payload) => {
//     switch (actionType) {
//       case 'ADD_ORDER': {
//         if (payload.length === 0) return null;
//         const newOrderId = generateOrderId();
//         const newOrder = {
//           id: newOrderId,
//           Products: payload,
//           status: 'Pending Payment',
//           totalPrice: payload.reduce((acc, p) => acc + p.price * p.quantity, 0),
//           totalProducts: payload.length
//         };
//         setOrders([newOrder, ...orders]);
//         setCartProducts([]);
//         setCount(0);
//         return newOrderId;
//       }
//       case 'DELETE_ORDER': {
//         const updatedOrders = orders.filter(order => order.id !== payload);
//         setOrders(updatedOrders);
//         break;
//       }
//       case 'CLEAR_ORDERS': {
//         setOrders([]);
//         break;
//       }
//       case 'COMPLETE_ORDER': {
//         const updatedOrders = orders.map(order =>
//           order.id === payload ? { ...order, status: 'Complete' } : order
//         );
//         setOrders(updatedOrders);
//         break;
//       }
//       default:
//         break;
//     }
//   };

//   //const addProductToCart = (productToAdd) => handleCartActions('ADD_PRODUCT', productToAdd);
//   const addProductToCart = (productToAdd) => {
//     if (isProductInOrders(productToAdd.id)) {
//       alert('This product is already in an order and cannot be added again.');
//       return;
//     }
//     handleCartActions('ADD_PRODUCT', productToAdd);
//   };

//   const removeProductFromCart = (productId) => handleCartActions('REMOVE_PRODUCT', productId);
//   const eraserItem = (id) => handleCartActions('ERASE_ITEM', id);
//   const clearCart = () => handleCartActions('CLEAR_CART');

//   const addOrder = (products) => handleOrderActions('ADD_ORDER', products);
//   const deleteOrder = (orderId) => handleOrderActions('DELETE_ORDER', orderId);
//   const clearOrders = () => handleOrderActions('CLEAR_ORDERS');
//   const completeOrder = (orderId) => handleOrderActions('COMPLETE_ORDER', orderId);

//   const isProductInOrders = (productId) => {
//     return orders.some(order => order.Products.some(product => product.id === productId));
//   };

//   return (
//     <ShoppingCartContext.Provider
//       value={{
//         products: apiData,
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
//         purchase: () => addOrder(cartProducts),
//         addOrder,
//         clearCart,
//         updateOrder: () => setOrder(cartProducts),
//         deleteOrder,
//         updateCount,
//         clearOrders,
//         completeOrder,
//         orders,
//         setOrders,
//         isProductInOrders,
//         items,
//         setItems,
//         search,
//         setSearch,
//       }}
//     >
//       {children}
//     </ShoppingCartContext.Provider>
//   );
// };

// ShoppingCartProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default ShoppingCartProvider;


// VERSIÓN ANTERIOR SIN SWITCH CASE (TAMBIÉN FUNCIONA BIEN PERO ES MÁS LARGO Y MENOS ORGANIZADO)
// import { createContext, useState, useEffect } from "react";
// import PropTypes from 'prop-types';

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

//   // Shooping Cart - Order
//   const [orderCount, setOrderCount] = useState();
//   const [order, setOrder] = useState([]);
//   const [orders, setOrders] = useState([]);

//    // Effect to load orders once on component mount
//    useEffect(() => {
//     const storedOrders = localStorage.getItem('orders');
//     if (storedOrders) {
//       setOrders(JSON.parse(storedOrders));
//     }
//   }, []);

//   useEffect(() => {
//     if (orders.length > 0) {
//       localStorage.setItem('orders', JSON.stringify(orders));
//     } 
//   }, [orders]);

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

// //------------------ ADD PRODUCT TO CART ------------------
// const addProductToCart = (productToAdd) => {
//   const existingProduct = cartProducts.find(p => p.id === productToAdd.id);
//   if (existingProduct) {
//     const newCartProducts = cartProducts.map(p =>
//       p.id === productToAdd.id ? { ...p, quantity: (p.quantity || 0) + 1 } : p
//     );
//     setCartProducts(newCartProducts);
//   } else {
//     setCartProducts([...cartProducts, { ...productToAdd, quantity: 1 }]);
//   }
//   updateCount();
// };

// // Shooping Cart - Order
// const addOrder = (products) => {
//   if (products.length === 0) {
//     return null;
//   }
//   const newOrderId = generateOrderId();
//   const newOrder = {
//     id: newOrderId,
//     Products: products,
//     status: 'Pending Payment',
//     totalPrice: products.reduce((acc, p) => acc + p.price * p.quantity, 0), //acc es acumulador (argumento de callback - reduce tiene una función de callback) es lo mismo como si usara la palabra total para la suma
//     totalProducts: products.length
//   };

//   setOrders(prevOrders => {
//     const updatedOrders = [newOrder, ...prevOrders]; // Agrega la nueva orden al inicio
//     return updatedOrders;
//   });
//   return newOrderId;
// };


// const purchase = () => {
//   if (cartProducts.length > 0) {
//     addOrder(cartProducts); // Add the current cart products as a new order
//     // The cart is cleared within addOrder
//   }
// };

// const clearCart = () => {
//   setCartProducts([]);
//   setCount(0);
// };

// const deleteOrder = (orderId) => {
//   const updatedOrders = orders.filter(order => order.id !== orderId);
//   setOrders(updatedOrders);
// };
// const clearOrders = () => {
//   setOrder([]);
// };

// const generateOrderId = () => {
//   const randomNumber = Math.floor(Math.random() * 1000); // Genera un número aleatorio de hasta 3 dígitos
//   const date = new Date();
//   const year = date.getFullYear().toString().slice(-2); // Obtiene los dos últimos dígitos del año
//   const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Obtiene el mes y agrega un cero a la izquierda si es necesario
//   const day = date.getDate().toString().padStart(2, '0'); // Obtiene el día y agrega un cero a la izquierda si es necesario
//   const formattedDate = `${year}${month}${day}`; // Formatea la fecha
//   return `As${randomNumber.toString().padStart(3, '0')}Ef-${formattedDate}`; // Devuelve el ID de la orden
// };

// const updateOrder = () => {
//   setOrder(cartProducts);
// };

// const completeOrder = (orderId) => {
//   const updatedOrders = orders.map(order =>
//     order.id === orderId ? { ...order, status: 'Complete' } : order
//   );
//   setOrders(updatedOrders);
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

// export default ShoppingCartProvider;