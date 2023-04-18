import React from "react";
import { useRouter } from "next/router";
import API from "@/services/axios";
import cert from "@/assets/doc.svg";
import { useQRCode } from "next-qrcode";

const doc = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = React.useState({});
  const { Canvas } = useQRCode();

  React.useEffect(() => {
    console.log(id);
    API.get(`/product/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const [url, setUrl] = React.useState("localhost");
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  console.log(url);

  return (
    <div
      className="w-[100vw] h-[100vh] flex flex-col justify-center items-center relative"
      style={{
        backgroundImage: `url(${cert.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <div className="text-xl -mt-16">{data.productOwnerAddress}</div>
      <div className=" absolute mt-[7.5rem]">
        {data.productName} is owned by the user
      </div>
      <div className=" absolute mt-[15rem]">{data.id}</div>
      <div className="absolute bottom-[4rem] right-[27rem]">
        <Canvas
          text={url}
          options={{
            level: "M",
            margin: 3,
            scale: 4,
            width: 120,
            color: {
              dark: "#000",
              light: "#Fdfaf5",
            },
          }}
        />
      </div>
      <div
        className="px-5 py-2 border-2 border-black absolute right-0 bottom-0 no-print"
        onClick={() => {
          window.print();
        }}
      >
        Save as PDF
      </div>
    </div>
  );
};

export default doc;
