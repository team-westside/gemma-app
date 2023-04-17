import React from "react";
import { useRouter } from "next/router";
import API from "@/services/axios";
import P404 from "@/pages/404";
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
      {productData.productName ? (
        <div className="flex flex-row">
          {/* Found */}
          {productData.productImages.map((image, index) => {
            return (
              <img
                className="flex flex-col flex-wrap w-[100px]"
                src={image}
                alt={productData.productName}
                key={index}
                onClick={() => {
                  setImageIndex(index);
                }}
              />
            );
          })}
          <img src={productData.productImages[imageIndex]} alt="" />
          {/* {JSON.stringify(productData)} */}
        </div>
      ) : (
        <P404 />
      )}
    </div>
  );
};

export default index;
