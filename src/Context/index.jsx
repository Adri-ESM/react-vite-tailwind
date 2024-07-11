import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useApiData } from '../ContextApi'; // Importa tu contexto de API
import { useFilteredData } from '../ContextFilter'; // Importa tu contexto de filtro

export const ShoppingCartContext = createContext({});

export const ShoppingCartProvider = ({ children }) => {
  const apiData = useApiData(); // Obtén los datos de la API desde el contexto
  const { filteredItems } = useFilteredData(); // Obtén los datos filtrados desde el contexto

  // Shopping Cart - total
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

  // Shopping Cart - Order
  const [orderCount, setOrderCount] = useState(0);
  const [order, setOrder] = useState([]);
  const [orders, setOrders] = useState([]);

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

  const generateOrderId = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;
    return `As${randomNumber.toString().padStart(3, '0')}Ef-${formattedDate}`;
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
        filteredItems,
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





//GUARDADO RECIENTEMENTE 10 DE JULIO 2024
