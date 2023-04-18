import React from "react";
import ProductModal from "@/components/Product/ProductModal";
import Product from "@/components/Product/Product";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import API from "@/services/axios";

const product = () => {
  const [products, setProducts] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  console.log(show, index);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(localStorage.getItem("gemma-user"));
      if (!localStorage.getItem("gemma-user")) {
        window.alert("Please login to continue");
        router.push("/");
      }
    }
  }, []);

  React.useEffect(() => {
    API.get(`products/owner/${user}`)
      .then((res) => {
        if (res.data.length > 0) {
          setProducts(res.data);
        }
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [user]);

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
