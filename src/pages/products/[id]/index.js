import React from "react";
import { useRouter } from "next/router";
import API from "@/services/axios";
import P404 from "@/pages/404";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [imageIndex, setImageIndex] = React.useState(0);
  // console.log(id);
  const [productData, setProduct] = React.useState({});
  React.useEffect(() => {
    API.get(`/product/${id}`)
      .then((res) => {
        // console.log(res);
        if (res.data) {
          setProduct(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      <Navbar />
      {productData.productName ? (
        <div className="flex flex-row">
          {/* Found */}
          <div className="flex flex-col flex-wrap">
            {productData.productImages.map((image, index) => {
              return (
                <img
                  className=" w-[100px] h-[100px]"
                  src={image}
                  alt={productData.productName}
                  key={index}
                  onClick={() => {
                    setImageIndex(index);
                  }}
                />
              );
            })}
          </div>
          <img
            src={productData.productImages[imageIndex]}
            alt=""
            className="h-[80vh]"
          />
          {/* {JSON.stringify(productData)} */}
        </div>
      ) : (
        <P404 />
      )}
      <Footer />
    </div>
  );
};

export default index;
