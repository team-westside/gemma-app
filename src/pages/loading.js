import React from "react";
import Lottie from "react-lottie";
import animationData from "@/assets/lottie/notfound.json";
import Link from "next/link";

const E404 = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [dimensions, setDimensions] = React.useState({});
  React.useEffect(() => {
    if (window.type !== undefined)
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden relative">
      <div
        className="absolute left-[25vw] top-[30vh] max-w-[20vw] text-3xl mx-auto z-10 w-full"
        style={{
          lineHeight: "50px",
        }}
      >
        The Requested Resource could not be found!
        <Link href={"/"}>
          <div className="px-4 py-2 border-2 border-black text-center cursor-pointer hover:bg-black hover:text-white transition-all mt-16">
            Back to Home
          </div>
        </Link>
      </div>

      <Lottie
        options={defaultOptions}
        height={dimensions.height}
        width={dimensions.width}
      />
    </div>
  );
};

export default E404;
