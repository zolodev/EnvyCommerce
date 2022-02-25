import { useRouter } from "next/router";
import React from "react";
import { getProcessPaymentButtonText } from "../constants";

const ProcessPaymentButton = () => {
  const router = useRouter();

  const handleProcessPayment = () => {
    router.push("/success");
  };

  return (
    <button
      type="button"
      onClick={handleProcessPayment}
      className="w-full p-2 font-semibold text-white uppercase bg-teal-700 rounded hover:bg-teal-900"
    >
      {getProcessPaymentButtonText()}
    </button>
  );
};

export default ProcessPaymentButton;
