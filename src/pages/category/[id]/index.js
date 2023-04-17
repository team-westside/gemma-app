import React from "react";
import ProductModal from "@/components/Product/ProductModal";
import Product from "@/components/Product/Product";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import API from "@/services/axios";
import { useRouter } from "next/router";

const product = () => {
  const router = useRouter();
  const { id } = router.query;
  const [products, setProducts] = React.useState([]);

  const [show, setShow] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  console.log(show, index);

  React.useEffect(() => {
    API.get(`/category/${id}/products`)
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          setProducts(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <Navbar />
      {show ? (
        <ProductModal setShow={setShow} product={products[index]} />
      ) : null}

      <div className="flex flex-row gap-x-4 justify-evenly flex-wrap px-2 max-w-[90vw] mx-auto min-h-[70vh]">
        {products?.map((product, idx) => (
          <div
            onClick={() => {
              setIndex(idx);
              setShow(true);
            }}
          >
            <Product show={show} key={product.id} product={product} />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default product;
