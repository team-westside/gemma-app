import React from "react";
import API from "@/services/axios";
import Link from "next/link";
const index = ({ data }) => {
  const [products, setProducts] = React.useState([]);
  const [collage, setCollage] = React.useState([]);
  React.useEffect(() => {
    API.get(`/category/${data.id}/products`)
      .then((res) => {
        console.log(res);
        if (res.data) {
          setProducts(res.data.slice(0, 3));
          setCollage(res.data.slice(-4));
        }
      })
      .catch((err) => console.log(err));
  }, [data]);
  return (
    <div>
      <div className="text-3xl pl-[4rem] pr-[9rem] py-4">
        {data.categoryName}
        <div className="flex flex-row justify-evenly -ml-16">
          {products?.map((product) => (
            <Link href={`/products/${product.id}`}>
              <div className="flex flex-col justify-center items-center gap-y-3 mt-5 mb-2 cursor-pointer">
                <img src={product.productImages[0]} className="w-[250px]" />
                <div className="text-lg">{product.productName}</div>
              </div>
            </Link>
          ))}
          <div className="relative flex flex-col w-[135px] transition-all my-auto aspect-square group hover:brightness-[0.7] cursor-pointer">
            <div className="flex flex-row object-contain">
              {collage.slice(0, 2).map((product) => {
                return (
                  <img
                    src={product.productImages[1]}
                    className=" basis-1/2 flex-grow-1 object-contain"
                  ></img>
                );
              })}
            </div>
            <div className="flex flex-row object-contain">
              {collage.slice(2, 4).map((product) => {
                return (
                  <img
                    src={product.productImages[1]}
                    className=" basis-1/2 flex-grow-1  object-contain"
                  ></img>
                );
              })}
            </div>
            {/* <div className="text-[white] group-hover:brightness-200 bg-blend-color-burn group-hover:block hidden transition-all absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 text-lg text-center w-[100px] mx-auto ml-[60px]">
              View More
            </div> */}
            <Link href={`/category/${data.id}`}>
              <div className="text-lg text-center translate-x-[65px] mt-3">
                View More
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* <img src={data.productImages[0]} />
      <div>{data.productName}</div> */}
    </div>
  );
};

export default index;
