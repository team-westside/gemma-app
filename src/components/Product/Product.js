import React from "react";
import product1 from "../../assets/products/product1.svg";
import Category from "@/components/Categories/Categories";

const Product = ({ product }) => {
  return (
    <div className="flex flex-col">
      <img
        src={product.productImages[0]}
        alt="product1"
        className="object-contain w-[200px] md:w-[350px]"
      />
      <div className="flex flex-col px-2">
        <div className="text-xl font-black capitalize ">
          {product.productName}
        </div>
        <div className="text-lg capitalize">{product.categoryName}</div>
        <div className="text-lg font-bold">ETH {product.productPrice}</div>
      </div>
    </div>
  );
};

export default Product;
