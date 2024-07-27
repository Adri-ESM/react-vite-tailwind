import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Contexts/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { openCart, count } = useContext(ShoppingCartContext);
  const activeStyle = "underline underline-thickness-thin underline-offset-4";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed top-0 w-full z-20 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <NavLink to="/" className="font-semibold text-lg">Adri&apost;s Shop</NavLink>
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
          </div>
          <div className="flex items-center space-x-4">
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-500 focus:outline-none">
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6 text-gray-500 cursor-pointer" onClick={openCart} />
              <span>{count}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white z-30 relative`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="flex flex-col space-y-1">
            <NavLink to="/" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Home</NavLink>
            <NavLink to="/clothes" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Clothes</NavLink>
            <NavLink to="/electronics" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Electronics</NavLink>
            <NavLink to="/jewelry" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Jewelry</NavLink>
            <NavLink to="/my-order" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>My Order</NavLink>
            <NavLink to="/my-orders" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>My Orders</NavLink>
            <NavLink to="/my-account" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>My Account</NavLink>
            <NavLink to="/sign-in" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Sign In</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





//ANTERIOR CON CART DENTRO DEL MENU
// import { useContext, useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { ShoppingCartContext } from "../../Contexts/Context";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

// const Navbar = () => {
//   const { openCart, count } = useContext(ShoppingCartContext);
//   const activeStyle = "underline underline-thickness-thin underline-offset-4";
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       setIsScrolled(scrollTop > 0);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className={`fixed top-0 w-full z-20 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <NavLink to="/" className="font-semibold text-lg">Adri&apost;s Shop</NavLink>
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
//       <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white z-30 relative`}>
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//           <div className="flex flex-col space-y-1">
//             <NavLink to="/" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Home</NavLink>
//             <NavLink to="/clothes" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Clothes</NavLink>
//             <NavLink to="/electronics" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Electronics</NavLink>
//             <NavLink to="/jewelry" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Jewelry</NavLink>
//           </div>
//           <div className="flex flex-col space-y-1">
//             <NavLink to="/my-order" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>My Order</NavLink>
//             <NavLink to="/my-orders" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>My Orders</NavLink>
//             <NavLink to="/my-account" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>My Account</NavLink>
//             <NavLink to="/sign-in" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={toggleMenu}>Sign In</NavLink>
//             <div className="flex items-center">
//               <FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6 text-gray-500 cursor-pointer" onClick={openCart} />
//               <span>{count}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;