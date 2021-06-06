export const getLocalProductsPath = (): string =>
  process.env.LOCAL_CONTENTS ?? "/Products";
export const getAllFilterKeys = () =>
  process.env.NEXT_PUBLIC_FILTER_KEYS
    ? process.env.NEXT_PUBLIC_FILTER_KEYS?.toString()
        .replace(/\s+/g, "")
        .split(",")
    : ["name"];
