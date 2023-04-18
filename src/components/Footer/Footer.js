import React from "react";
import logoname from "../../assets/logoname.svg";
import ethereum from "../../assets/Ethereum.png";
import metamask from "../../assets/cards/metamask.svg";

const Footer = () => {
  return (
    <footer className="w-[100vw] flex flex-col ">
      <div className="flex flex-row px-10 py-4">
        <div className="flex flex-col basis-[33%] gap-y-3">
          <div className="w-[60%]">
            <img src={logoname.src} alt="logo" className="object-contain" />
          </div>
          <div className="max-w-[70%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div>Socials</div>
        </div>
        <div className="flex flex-row basis-[33%] justify-center gap-x-24">
          <div className="flex flex-col justify-evenly">
            <div className="text-lg font-bold">Links</div>
            <div className="text-lg">High Jewellery</div>
            <div className="text-lg">Fine Jewellery </div>
            <div className="text-lg">Wedding Jewellery</div>
          </div>
          <div className="flex flex-col justify-evenly">
            <div className="text-lg font-bold">MISC</div>
            <div className="text-lg">Support</div>
            <div className="text-lg">Contact Us</div>
            <div className="text-lg">Policy</div>
            <div className="text-lg">FAQs</div>
          </div>
        </div>

        <div className="flex flex-row flex-wrap justify-center basis-[20%] mx-auto">
          <img
            src={metamask.src}
            alt="amex"
            className="object-contain h-[140px] p-3"
          />

          <img
            src={ethereum.src}
            alt="visa"
            className="object-contain h-[140px] p-3"
          />
        </div>
      </div>
      <div className="text-center bg-[#00000015] w-[100vw]">
        © 2023 Gemma Rights Reserved | (+00) 123 567990 | contact@gemma.com
      </div>
    </footer>
  );
};

export default Footer;
