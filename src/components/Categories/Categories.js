import React from "react";
import image from "../../assets/HomePage/main.svg";
import image1 from "../../assets/HomePage/FeelGood.svg";

const Categories = () => {
  return (
    <div className="font-poppins">
      <div>
        <div
          className="w-[85vw] mx-auto h-[80vh] bg-no-repeat bg-contain bg-center relative"
          style={{
            backgroundImage: `url(${image.src})`,
          }}
        >
          <button className="bg-[#3f3f3f] text-[#f9f9f9] px-[5rem] py-3 absolute left-[4rem] bottom-[6rem]">
            Shop Now
          </button>
        </div>
        {/* <img className="flex justify-center mx-auto" src={image.src} /> */}
      </div>
      <div className="text-5xl px-[6rem] py-7">Categories</div>
      <div className="text-3xl px-[6.5rem] py-4">High Jewellery</div>
      <div className="text-3xl px-[6.5rem] py-4">Fine Jewellery</div>
      <div className="text-3xl px-[6.5rem] py-4">Wedding Jewellery</div>
      <img className="w-[100vw]" src={image1.src} />
      <div className="text-2xl font-bold px-[5rem] py-4">You may also like</div>
    </div>
  );
};

export default Categories;
