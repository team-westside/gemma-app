import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const login = () => {
  return (
    <div>
      <Navbar />
      <div className="text-5xl flex flex-row justify-center pt-[4rem]">
        Login
      </div>
      <Footer />
    </div>
  );
};

export default login;
