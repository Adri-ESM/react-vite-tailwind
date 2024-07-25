import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Contexts/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { openCart, count } = useContext(ShoppingCartContext);
  const activeStyle = "underline underline-thickness-thin underline-offset-4";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white fixed top-0 w-full z-20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <NavLink to="/" className="font-semibold text-lg">Adri's Shop</NavLink>
            <div className="hidden md:flex space-x-4 ml-10">
              <NavLink to="/" className={({ isActive }) => (isActive ? activeStyle : undefined)}>Home</NavLink>
              <NavLink to="/clothes" className={({ isActive }) => (isActive ? activeStyle : undefined)}>Clothes</NavLink>
              <NavLink to="/electronics" className={({ isActive }) => (isActive ? activeStyle : undefined)}>Electronics</NavLink>
              <NavLink to="/jewelry" className={({ isActive }) => (isActive ? activeStyle : undefined)}>Jewelry</NavLink>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/my-order" className={({ isActive }) => (isActive ? activeStyle : undefined)}>My Order</NavLink>
            <NavLink to="/my-orders" className={({ isActive }) => (isActive ? activeStyle : undefined)}>My Orders</NavLink>
            <NavLink to="/my-account" className={({ isActive }) => (isActive ? activeStyle : undefined)}>My Account</NavLink>
            <NavLink to="/sign-in" className={({ isActive }) => (isActive ? activeStyle : undefined)}>Sign In</NavLink>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6 text-gray-500 cursor-pointer" onClick={openCart} />
              <span>{count}</span>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-500 focus:outline-none">
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/clothes" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Clothes</NavLink>
          <NavLink to="/electronics" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Electronics</NavLink>
          <NavLink to="/jewelry" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Jewelry</NavLink>
          <NavLink to="/my-order" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>My Order</NavLink>
          <NavLink to="/my-orders" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>My Orders</NavLink>
          <NavLink to="/my-account" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>My Account</NavLink>
          <NavLink to="/sign-in" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Sign In</NavLink>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6 text-gray-500 cursor-pointer" onClick={openCart} />
            <span>{count}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;







// import { useContext, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { ShoppingCartContext } from "../../Contexts/Context";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

// const Navbar = () => {
//   const { openCart, count } = useContext(ShoppingCartContext);
//   const activeStyle = "underline underline-thickness-thin underline-offset-4";
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className="flex justify-between bg-white items-center top-0 fixed z-20 w-full py-5 px-8 text-sm font-light">
//       <div className="flex items-center">
//         <button className="text-gray-500 focus:outline-none md:hidden" onClick={toggleMenu}>
//           <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="w-6 h-6" />
//         </button>
//         <NavLink to="/" className="font-semibold text-lg ml-4">Adri&apos;s Shop</NavLink>
//       </div>

//       <ul className={`flex-col md:flex md:flex-row md:items-center gap-3 ${isMenuOpen ? 'flex' : 'hidden'} md:gap-0 md:static absolute top-16 left-0 w-full md:w-auto bg-white md:bg-transparent`}>
//         <li className="ml-4 my-2">
//           <NavLink
//             to="/"
//             className={({ isActive }) => (isActive ? activeStyle : undefined)}
//             onClick={toggleMenu}
//           >
//             Home
//           </NavLink>
//         </li>
//         <li className="ml-4 my-2">
//           <NavLink
//             to="/clothes"
//             className={({ isActive }) => (isActive ? activeStyle : undefined)}
//             onClick={toggleMenu}
//           >
//             Clothes
//           </NavLink>
//         </li>
//         <li className="ml-4 my-2">
//           <NavLink
//             to="/electronics"
//             className={({ isActive }) => (isActive ? activeStyle : undefined)}
//             onClick={toggleMenu}
//           >
//             Electronics
//           </NavLink>
//         </li>
//         <li className="ml-4 my-2">
//           <NavLink
//             to="/jewelry"
//             className={({ isActive }) => (isActive ? activeStyle : undefined)}
//             onClick={toggleMenu}
//           >
//             Jewelry
//           </NavLink>
//         </li>
//         <li className="ml-4 my-2">
//           <NavLink
//             to="/my-order"
//             className={({ isActive }) => (isActive ? activeStyle : undefined)}
//             onClick={toggleMenu}
//           >
//             My Order
//           </NavLink>
//         </li>
//         <li className="ml-4 my-2">
//           <NavLink
//             to="/my-orders"
//             className={({ isActive }) => (isActive ? activeStyle : undefined)}
//             onClick={toggleMenu}
//           >
//             My Orders
//           </NavLink>
//         </li>
//         <li className="ml-4 my-2">
//           <NavLink
//             to="/my-account"
//             className={({ isActive }) => (isActive ? activeStyle : undefined)}
//             onClick={toggleMenu}
//           >
//             My Account
//           </NavLink>
//         </li>
//         <li className="ml-4 my-2">
//           <NavLink
//             to="/sign-in"
//             className={({ isActive }) => (isActive ? activeStyle : undefined)}
//             onClick={toggleMenu}
//           >
//             Sign In
//           </NavLink>
//         </li>
//         <li className="flex items-center mt-2 md:mt-0 ml-4">
//           <FontAwesomeIcon
//             icon={faShoppingCart}
//             className="w-6 h-6 text-gray-500 cursor-pointer"
//             onClick={openCart}
//           />
//           <span>{count}</span>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;


// otro modelo de Navbarimport { useContext, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { ShoppingCartContext } from "../../Contexts/Context";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

// const Navbar = () => {
//   const { openCart, count } = useContext(ShoppingCartContext);
//   const activeStyle = "underline underline-thickness-thin underline-offset-4";
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className="bg-white fixed top-0 w-full z-20 shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <NavLink to="/" className="font-semibold text-lg">Adri's Shop</NavLink>
//             <div className="hidden md:flex space-x-4 ml-10">
//               <NavLink to="/" className={({ isActive }) => (isActive ? activeStyle : undefined)}>Home</NavLink>
//               <NavLink to="/clothes" className={({ isActive }) => (isActive ? activeStyle : undefined)}>Clothes</NavLink>
//               <NavLink to="/electronics" className={({ isActive }) => (isActive ? activeStyle : undefined)}>Electronics</NavLink>
//               <NavLink to="/jewelry" className={({ isActive }) => (isActive ? activeStyle : undefined)}>Jewelry</NavLink>
//             </div>
//           </div>
//           <div className="hidden md:flex items-center space-x-4">
//             <NavLink to="/my-order" className={({ isActive }) => (isActive ? activeStyle : undefined)}>My Order</NavLink>
//             <NavLink to="/my-orders" className={({ isActive }) => (isActive ? activeStyle : undefined)}>My Orders</NavLink>
//             <NavLink to="/my-account" className={({ isActive }) => (isActive ? activeStyle : undefined)}>My Account</NavLink>
//             <NavLink to="/sign-in" className={({ isActive }) => (isActive ? activeStyle : undefined)}>Sign In</NavLink>
//             <div className="flex items-center">
//               <FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6 text-gray-500 cursor-pointer" onClick={openCart} />
//               <span>{count}</span>
//             </div>
//           </div>
//           <div className="md:hidden flex items-center">
//             <button onClick={toggleMenu} className="text-gray-500 focus:outline-none">
//               <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="w-6 h-6" />
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//           <NavLink to="/" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Home</NavLink>
//           <NavLink to="/clothes" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Clothes</NavLink>
//           <NavLink to="/electronics" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Electronics</NavLink>
//           <NavLink to="/jewelry" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Jewelry</NavLink>
//           <NavLink to="/my-order" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>My Order</NavLink>
//           <NavLink to="/my-orders" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>My Orders</NavLink>
//           <NavLink to="/my-account" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>My Account</NavLink>
//           <NavLink to="/sign-in" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Sign In</NavLink>
//           <div className="flex items-center">
//             <FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6 text-gray-500 cursor-pointer" onClick={openCart} />
//             <span>{count}</span>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;