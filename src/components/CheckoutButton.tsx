import router from "next/router";
import React from "react";
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
        {process.env.NEXT_PUBLIC_PRODUCT_CHECKOUT_DISPLAY_TEXT ?? "Checkout"}
      </button>
    </>
  );
};

export default CheckoutButton;
