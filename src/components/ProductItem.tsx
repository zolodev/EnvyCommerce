import React from "react";
import { Product } from "../types";
import HeroImage from "./HeroImage";

type ProductProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductProps) => {
  return (
    <>
      <div key={product.id} className="mb-5 w-96 Product-Card">
        <HeroImage image={product.hero} />

        <div className="p-4">
          <h2 className="max-w-sm text-2xl text-teal-700">{product.name}</h2>

          <p className="h-16 max-w-xs my-2 text-blueGray-600">
            {product.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
