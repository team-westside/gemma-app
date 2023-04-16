import React from "react";
import logoname from "../../assets/logoname.svg";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";

const Navbar = () => {
  const items = ["Products", "Accesories", "About"];

  return (
    <div className="w-[100vw] bg-white text-black flex flex-row justify-between py-4 px-10 items-center">
      <div className="max-w-[14vw]">
        <img src={logoname.src} alt="logo" className="object-contain" />
      </div>
      <div className="flex flex-row justify-evenly gap-x-5">
        {items.map((item) => {
          return (
            <div className="text-lg transition-all hover:text-[#F9A826] cursor-pointer">
              {item}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row justify-evenly gap-x-3">
        <FaUser className="text-2xl hover:text-[#F9A826]  cursor-pointer transition-all" />
        <AiFillHeart className="text-2xl hover:text-[#ba9d6d] cursor-pointer transition-all" />
        <BsCart2 className="text-2xl hover:text-[#F9A826] cursor-pointer transition-all" />
      </div>
    </div>
  );
};

export default Navbar;
