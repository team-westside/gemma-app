import React from "react";
import image from "../../assets/HomePage/main.svg";
import image1 from "../../assets/HomePage/FeelGood.svg";
import product1 from "../../assets/products/product1.svg";
import CategoryProduct from "@/components/CategoryProduct";
import Link from "next/link";

const Categories = ({ data }) => {
  return (
    <div className="font-poppins">
      <div>
        <div
          className="w-[85vw] mx-auto h-[80vh] bg-no-repeat bg-contain bg-center relative"
          style={{
            backgroundImage: `url(${image.src})`,
          }}
        >
          <Link href="\products">
            <button className="bg-[#3f3f3f] text-[#f9f9f9] px-[5rem] py-3 absolute left-[4rem] bottom-[6rem]">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
      <div className="text-5xl px-[6rem] py-7">Categories</div>
      {data?.map((item) => {
        return <CategoryProduct key={item.id} data={item} />;
      })}

      <img className="w-[100vw]" src={image1.src} />
      <div className="text-2xl font-bold px-[5rem] py-4">You may also like</div>
    </div>
  );
};

export default Categories;
