import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import API from "@/services/axios";
import Product from "@/components/Product/Product";
import ProductModal from "@/components/Product/ProductModal";

const search = () => {
  const [searchResults, setSearchResults] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  console.log(show, index);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    const str = e.target[0].value.split(" ").join("+");
    const data = API.get("/products/search/" + str).then((res) => {
      console.log(res);
      setSearchResults(res.data);
    });
  };

  return (
    <div>
      <Navbar />
      <div className="w-full flex flex-col justify-center items-center py-10 px-2">
        <div className="mx-auto text-3xl">Search</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="px-5 py-2 border-2 w-[75vw] mx-auto mt-5"
          ></input>
        </form>
        <div>
          {show ? (
            <ProductModal setShow={setShow} product={searchResults[index]} />
          ) : null}

          <div className="flex flex-row gap-x-4 justify-evenly flex-wrap px-2 max-w-[90vw] mx-auto min-h-[70vh]">
            {searchResults?.map((product, idx) => (
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default search;
