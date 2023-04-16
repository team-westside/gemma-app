import React from "react";
import logoname from "../../assets/logoname.svg";
import amex from "../../assets/cards/amex.svg";
import maestro from "../../assets/cards/maestro.svg";
import mastercard from "../../assets/cards/mastercard.svg";
import visa from "../../assets/cards/visa.svg";

const Footer = () => {
  return (
    <footer className="w-[100vw] flex flex-col px-10 py-4">
      <div className="flex flex-row">
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
            <div className="text-lg">Products</div>
            <div className="text-lg">Accesories</div>
            <div className="text-lg">About</div>
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
          <img src={amex.src} alt="amex" className="object-contain w-[90px]" />
          <img
            src={maestro.src}
            alt="maestro"
            className="object-contain w-[90px]"
          />
          <img
            src={mastercard.src}
            alt="mastercard"
            className="object-contain w-[90px]"
          />
          <img src={visa.src} alt="visa" className="object-contain w-[90px]" />
        </div>
      </div>
      <div className="text-center w-[100%]">
        © 2023 Gemma Rights Reserved | (+00) 123 567990 | contact@gemma.com
      </div>
    </footer>
  );
};

export default Footer;
