import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ShoppingCartProvider } from "../../Contexts/Context";
import { ApiDataProvider } from "../../Contexts/ContextApi";
import { FilteredProvider } from "../../Contexts/ContextFilter"; 
import PrivateRoute from "../../Components/PrivateRoute";
import { AuthProvider } from "../../Contexts/AuthProvider";
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
import SignUp from "../../Components/SignUp";
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
  <AuthProvider>
    <Routes>\
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/" element={<Home />} />
      <Route path="/my-account" element={<PrivateRoute><MyAccount /></PrivateRoute>} />
      <Route path="/my-order" element={<PrivateRoute><MyOrder /></PrivateRoute>} />
      <Route path="/my-order/:orderId" element={<PrivateRoute><MyOrder /></PrivateRoute>} />
      <Route path="/my-orders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />
      <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
      <Route path="/clothes" element={<Clothes />} />
      <Route path="/electronics" element={<Electronics />} />
      <Route path="/jewelry" element={<Jewelry />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </AuthProvider>
);

const App = () => {
  return (
    <AuthProvider>
      <ApiDataProvider>
        <FilteredProvider>
          <ShoppingCartProvider>
            <Router>
              <RedirectHomeOnMount />
              <Navbar />
              <Cart />
              <AppRoutes />
            </Router>
          </ShoppingCartProvider>
        </FilteredProvider>
      </ApiDataProvider>
    </AuthProvider>
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