import React from "react";
import useCart from "../hooks/useCart";
import ListCartItems from "./CartItemList";
import ProcessPaymentButton from "./CheckoutButton";

const Cart = () => {
  const { cart, closeCart, isCartOpen } = useCart();

  const handleCloseCart = () => closeCart();

  return (
    <div
      className={`fixed top-0 z-20 right-0 h-full shadow-2xl bg-blueGray-200 w-96 transition-transform ease-in-out duration-300 ${
        isCartOpen ? "transform -translate-x-0" : "transform translate-x-full"
      }`}
    >
      <header className="flex justify-between p-4 shadow-md">
        <span className="text-3xl font-semibold">Cart</span>
        <button onClick={handleCloseCart} aria-label="Close Cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </header>
      <div>
        {cart.length > 0 && (
          <span className="flex justify-center m-8 text-xl border-b-2 border-gray-100">
            Items in cart
          </span>
        )}

        <ListCartItems />
      </div>
      <div className="flex mx-8 mt-10">
        {cart.length > 0 && <ProcessPaymentButton />}
      </div>
    </div>
  );
};

export default Cart;
