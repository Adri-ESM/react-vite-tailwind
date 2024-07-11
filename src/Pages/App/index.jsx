import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ShoppingCartProvider } from "../../Context";
import { ApiDataProvider } from "../../ContextApi";
import { FilteredProvider } from "../../ContextFilter"; // Importa tu contexto de filtro
import Navbar from "../../Components/Navbar";
import Home from "../Home";
import MyAccount from "../MyAccount";
import MyOrder from "../MyOrder";
import MyOrders from "../MyOrders";
import NotFound from "../NotFound";
import Clothes from "../Clothes";
import Electronics from "../Electronics";
import Jewelry from "../Jewelry";
import SignIn from "../SignIn";
import Cart from "../../Components/Cart";
import "../../App.css";

const RedirectHomeOnMount = () => {
  const navigate = useNavigate();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (!redirected) {
      navigate("/");
      setRedirected(true);
    }
  }, [navigate, redirected]);

  return null;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/my-account" element={<MyAccount />} />
    <Route path="/my-order/:orderId" element={<MyOrder />} />
    <Route path="/my-orders" element={<MyOrders />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/clothes" element={<Clothes />} />
    <Route path="/electronics" element={<Electronics />} />
    <Route path="/jewelry" element={<Jewelry />} />
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

const App = () => {
  return (
    <React.StrictMode>
      <ApiDataProvider>
        <FilteredProvider>
          <ShoppingCartProvider>
            <BrowserRouter>
              <RedirectHomeOnMount />
              <Navbar />
              <AppRoutes />
            </BrowserRouter>
          </ShoppingCartProvider>
        </FilteredProvider>
      </ApiDataProvider>
    </React.StrictMode>
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

//Guardado recientemente miercoles 26 junio
//import { useRoutes, BrowserRouter } from "react-router-dom";
// import { ShoppingCartProvider } from "../../Context";
// import Navbar from "../../Components/Navbar";
// import Home from "../Home";
// import MyAccount from "../MyAccount";
// import MyOrder from "../MyOrder";
// import MyOrders from "../MyOrders";
// // import OrdersCards from "../OrdersCards";
// import NotFound from "../NotFound";
// import Clothes from "../Clothes";
// import Electronics from "../Electronics";
// import Jewelry from "../Jewelry";
// import SignIn from "../SignIn";
// import Cart from "../../Components/Cart";
// import "../../App.css";

// const AppRoutes = () => {
//   let routes = useRoutes([
//     {
//       path: "/",
//       element: <Home />,
//     },
//     {
//       path: "/my-account",
//       element: <MyAccount />,
//     },
//     {
//       path: "/my-order",
//       element: <MyOrder />,
//     },
//     {
//       path: "/my-orders",
//       element: <MyOrders />,
//     },
//     { path: '/my-orders/last', element: <MyOrder /> },
//     {
//       path: '/my-orders/:orderId', element: <MyOrder />},
//     {
//       path: "/sign-in",
//       element: <SignIn />,
//     },
//     {
//       path: "/cart",
//       element: <Cart />,
//     },
//     {
//       path: "/clothes",
//       element: <Clothes />,
//     },
//     {
//       path: "/electronics",
//       element: <Electronics />,
//     },
//     {
//       path: "/jewelry",
//       element: <Jewelry />,
//     },
//     {
//       path: "/*",
//       element: <NotFound />,
//     },
//   ]);
//   return routes;
// };

// const App = () => {
//   return (
//     <ShoppingCartProvider>
//       <BrowserRouter>
//         <AppRoutes />
//         <Navbar />
//       </BrowserRouter>
//     </ShoppingCartProvider>
//   );
// };

// export default App;