import { useRouter } from "next/router";
import React from "react";

const ProcessPaymentButton = () => {
  const router = useRouter();

  const handleProcessPayment = () => {
    router.push("/success");
  };

  return (
    <>
      <button
        onClick={handleProcessPayment}
        className="w-full p-2 font-semibold text-white uppercase bg-teal-700 rounded hover:bg-teal-900"
      >
        {process.env.NEXT_PUBLIC_PRODUCT_PROCESS_PAYMENT_DISPLAY_TEXT ??
          "Process Payment"}
      </button>
    </>
  );
};

export default ProcessPaymentButton;
