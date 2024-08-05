import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
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
import { ShoppingCartProvider } from "../../Contexts/Context";
import { ApiDataProvider } from "../../Contexts/ContextApi";
import { FilteredProvider } from "../../Contexts/ContextFilter"; 
import PrivateRoute from "../../Components/PrivateRoute";
import { AuthProvider } from "../../Contexts/AuthProvider"; // Asegúrate de que este proveedor esté correctamente configurado

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
    <Routes>
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





//ESTE APP ES EL QUE SE VA A USAR CUANDO NO FUNCIONE FIREBASE SE VUELVE ATRAS
// import { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import Navbar from "../../Components/Navbar";
// import Home from "../Home";
// import MyAccount from "../MyAccount";
// import MyOrder from "../MyOrder";
// import MyOrders from "../MyOrders";
// import NotFound from "../NotFound";
// import Clothes from "../Clothes";
// import Electronics from "../Electronics";
// import Jewelry from "../Jewelry";
// import SignIn from "../SignIn";
// import SignUp from "../../Components/SignUp";
// import Cart from "../../Components/Cart";
// import "../../App.css";
// import { ShoppingCartProvider } from "../../Contexts/Context";
// import { ApiDataProvider } from "../../Contexts/ContextApi";
// import { FilteredProvider } from "../../Contexts/ContextFilter"; 
// import PrivateRoute from "../../Components/PrivateRoute";
// import { AuthProvider } from "../../Contexts/AuthProvider"; // Asegúrate de que este proveedor esté correctamente configurado

// const RedirectHomeOnMount = () => {
//   const navigate = useNavigate();
//   const [redirected, setRedirected] = useState(false);

//   useEffect(() => {
//     if (!redirected) {
//       navigate("/");
//       setRedirected(true);
//     }
//   }, [navigate, redirected]);

//   return null;
// };

// const AppRoutes = () => (
//   <AuthProvider>
//     <Routes>
//       <Route path="/sign-in" element={<SignIn />} />
//       <Route path="/sign-up" element={<SignUp />} />
//       <Route path="/" element={<Home />} />
//       <Route path="/my-account" element={<PrivateRoute><MyAccount /></PrivateRoute>} />
//       <Route path="/my-order" element={<PrivateRoute><MyOrder /></PrivateRoute>} />
//       <Route path="/my-order/:orderId" element={<PrivateRoute><MyOrder /></PrivateRoute>} />
//       <Route path="/my-orders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />
//       <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
//       <Route path="/clothes" element={<Clothes />} />
//       <Route path="/electronics" element={<Electronics />} />
//       <Route path="/jewelry" element={<Jewelry />} />
//       <Route path="/*" element={<NotFound />} />
//     </Routes>
//   </AuthProvider>
// );

// const App = () => {
//   return (
//     <AuthProvider>
//       <ApiDataProvider>
//         <FilteredProvider>
//           <ShoppingCartProvider>
//             <Router>
//               <RedirectHomeOnMount />
//               <Navbar />
//               <Cart />
//               <AppRoutes />
//             </Router>
//           </ShoppingCartProvider>
//         </FilteredProvider>
//       </ApiDataProvider>
//     </AuthProvider>
//   );
// };

// export default App;