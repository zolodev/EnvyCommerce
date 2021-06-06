export const getAllFilterKeys = async () =>
  process.env.NEXT_PUBLIC_FILTER_KEYS
    ? process.env.NEXT_PUBLIC_FILTER_KEYS?.toString()
        .replace(/\s+/g, "")
        .split(",")
    : ["name"];
