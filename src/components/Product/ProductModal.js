import Link from "next/link";
import React from "react";
import { AiOutlineClose, AiOutlineShareAlt } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
// import clsx from 'clsx'

const ProductModal = ({ show, setShow, product }) => {
  return (
    <div className="w-[100vw] h-[100vh] transition-all overflow-y-hidden fixed top-0 left-0 z-[100] bg-[#00000195] backdrop-blur-sm flex flex-row justify-center items-center">
      <div
        id="product-modal"
        className="w-[50vw] h-[60vh] bg-white mx-auto my-auto p-5 slide-in-top fixed flex flex-row"
      >
        <div
          className={"text-3xl hover:opacity-80 transition-all cursor-pointer"}
          onClick={() => {
            if (typeof document !== undefined) {
              const doc = document.getElementById("product-modal");
              doc.classList.remove("slide-in-top");
              doc.classList.add("slide-out-bottom");
              setTimeout(() => {
                setShow(false);
              }, 500);
              // setShow(false)
            }
          }}
        >
          <AiOutlineClose />
        </div>
        <div className="flex flex-row mt-10 w-full gap-x-5">
          <div className="max-w-[20vw] object-fit max-h-[90%] mt-5">
            <img src={product.productImages[0]} />
          </div>
          <div className="flex flex-col w-full mt-5 justify-between pb-12">
            <div className="flex flex-row justify-between items-center w-[100%] flex-wrap">
              <div className="text-2xl font-bold basis-[60%]">
                {product.productName}
              </div>
              <div className="text-2xl">ETH {product.productPrice}</div>
            </div>
            <div className="text-xl mt-2 text-[#00000060] flex flex-row flex-wrap">
              {product.categoryName}
            </div>
            <div className="text-l mt-4 flex flex-row flex-wrap">
              {product.productDescription}
            </div>
            <div className="flex flex-row justify-center items-center w-[100%] mt-5 gap-x-3 mx-auto">
              <div className="">
                <button className="text-[#ffffff] bg-[#323232] text-xs px-10 py-2 border-2 border-black hover:text-[#323232] hover:bg-[#ffffff] hover:border-black-500">
                  Buy Now
                </button>
              </div>

              <div>
                <Link href={`/products/${product.id}`}>
                  <div className="text-[#323232] bg-[#ffffff] text-xs px-10 py-2 border-2 border-black border-opacity-100">
                    View More
                  </div>
                </Link>
              </div>
              <div>
                <button className="text-[#323232] bg-[#ffffff] text-md px-4 py-2 border-2 border-black border-opacity-100">
                  <FiShare />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
