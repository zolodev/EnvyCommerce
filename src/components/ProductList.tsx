import Link from "next/link";
import React from "react";
import { Product } from "../types";
import { convertPrice } from "../utils/converter";
import AddToCartButton from "./AddToCartButton";
import ProductItem from "./ProductItem";

type ProductListProps = {
  data: Product[];
};

const ProductList = ({ data }: ProductListProps) => (
  <>
    <div className="flex flex-wrap justify-center lg:justify-start">
      {data &&
        data.map((p: Product) => (
          <div key={p.id} className="m-5 border-2">
            <Link href={p.url}>
              <a href="/#">
                <ProductItem product={p} />
              </a>
            </Link>
            <footer className="flex justify-between p-4 bg-teal-600">
              <p className="text-2xl text-white align-text-bottom ">
                {convertPrice(p.price)}
              </p>
              <div className="flex flex-grow" />
              <div>
                <AddToCartButton product={p} />
              </div>
            </footer>
          </div>
        ))}
    </div>
  </>
);

export default ProductList;
