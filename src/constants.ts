export const getAddToCartButtonText = (): string =>
  process.env.NEXT_PUBLIC_PRODUCT_ADD_TO_CART_DISPLAY_TEXT ?? "Add to cart";

export const getCheckoutButtonText = (): string =>
  process.env.NEXT_PUBLIC_PRODUCT_CHECKOUT_DISPLAY_TEXT ?? "Checkout";

export const getProcessPaymentButtonText = (): string =>
  process.env.NEXT_PUBLIC_PRODUCT_PROCESS_PAYMENT_DISPLAY_TEXT
  ?? "Process Payment";

export const getLocalProductsPath = (): string =>
  process.env.LOCAL_CONTENTS ?? "/Products";

export const getAllFilterKeys = () =>
  (process.env.NEXT_PUBLIC_FILTER_KEYS
    ? process.env.NEXT_PUBLIC_FILTER_KEYS?.toString()
      .replace(/\s+/g, "")
      .split(",")
    : ["name"]);
