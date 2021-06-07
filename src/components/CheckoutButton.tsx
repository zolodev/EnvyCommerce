import router from "next/router";
import React from "react";
import { getCheckoutButtonText } from "../constants";
import useCart from "../hooks/useCart";

const CheckoutButton = () => {
  const { closeCart } = useCart();

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <>
      <button
        onClick={handleCheckout}
        className="w-full p-2 font-semibold text-white uppercase bg-teal-700 rounded hover:bg-teal-900"
      >
        {getCheckoutButtonText()}
      </button>
    </>
  );
};

export default CheckoutButton;
