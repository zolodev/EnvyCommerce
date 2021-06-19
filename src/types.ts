export type Cart = {
  cart: CartItem[];
  addItemToCart: (product: Product, quantity?: number) => void;
  removeItemFromCart: (product: Product) => void;
  openCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;
  totalSumOfCart: () => number;
  totalNumberOfItemsInCart: () => number;
  clearCart: () => void;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type ImageInfo = {
  src: string;
  alt: string;
  isDefaultImage: boolean;
};

export type Page = {
  published: string;
  unpublish: string;
  name: string;
  hero: ImageInfo;
  slug: string;
  url: string;
  content: string;
};

export type ProductVariant = {
  id: string;
  name: string;
  short: string;
  price: number;
};

export type Product = {
  id: string;
  published: string;
  unpublish: string;
  name: string;
  hero: ImageInfo;
  images: ImageInfo[];
  description: string;
  variants: ProductVariant[];
  promotion: string;
  price: number;
  slug: string;
  url: string;
  collection?: string;
  keywords?: string[];
  YouTubeUrl?: string;
  content: string;
};
