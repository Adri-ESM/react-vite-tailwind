import { useRoutes, BrowserRouter } from "react-router-dom";
import { ShoppingCartProvider } from "../../Context";
import Navbar from "../../Components/Navbar";
import Home from "../Home";
import MyAccount from "../MyAccount";
import MyOrder from "../MyOrder";
import MyOrders from "../MyOrders";
import OrdersCards from "../OrdersCards";
import NotFound from "../NotFound";
import Clothes from "../Clothes";
import Electronics from "../Electronics";
import Jewelry from "../Jewelry";
import SignIn from "../SignIn";
import Cart from "../../Components/Cart";
import "../../App.css";

const AppRoutes = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/my-account",
      element: <MyAccount />,
    },
    {
      path: "/my-order",
      element: <MyOrder />,
    },
    {
      path: "/orders-cards",
      element: <OrdersCards />,
    },
    {
      path: "/my-orders",
      element: <MyOrders />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/clothes",
      element: <Clothes />,
    },
    {
      path: "/electronics",
      element: <Electronics />,
    },
    {
      path: "/jewelry",
      element: <Jewelry />,
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);
  return routes;
};

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default App;

//CONTADOR
// import React, { useState } from "react";
// import "./App.css";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <div>
//         <h1>Counter</h1>
//         <h2>{count}</h2>
//         <button onClick={() => setCount(count + 1)}>+</button>
//         <button onClick={() => setCount(count - 1)}>-</button>
//       </div>
//     </>
//   );
// }

// export default App;
