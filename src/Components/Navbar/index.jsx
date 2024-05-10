import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { generateUniqueKey } from "../utils/index.js";

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const activeStyle = "underline underline-thickness-thin underline-offset-4";

  const openProductModal = () => {
    context.openCart();
  };

  // Función para actualizar el contador al eliminar productos
  // const updateCountOnRemove = () => {
  //   let totalCount = 0;
  //   context.cartProducts.forEach(product => {
  //     totalCount += product.quantity;
  //   });
  //   return totalCount;
  // };

  return (
    <nav className="flex justify-between bg-white items-center top-0 fixed z-10 w-full py-5 px-8 text-sm font-light">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to="/">Adri&apos;s  Shop</NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clothes"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/electronics"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/jewelry"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Jewelry
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        <li>
          <NavLink
            to="/my-order"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            My Order
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-orders"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            All My Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-account"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Sign In
          </NavLink>
        </li>
        <li>
          <FontAwesomeIcon
             icon={faShoppingCart}
             className="w-6 h-6 text-gray- cursor-pointer"
             onClick={openProductModal}
          />
           {context.count}
          
          
       
        {context.cartProducts.map((product) => (
          <div
            key={product.cartItemId || generateUniqueKey()}  
            onClick={() => {
              context.removeProductFromCart(product.id);
              const newCount = updateCountOnRemove();
              context.setCount(newCount);
            }}
          >
          </div>
        ))}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;