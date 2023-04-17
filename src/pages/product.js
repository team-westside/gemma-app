import React from "react";
import ProductModal from "@/components/Product/ProductModal";
import Product from "@/components/Product/Product";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const product = () => {
  const products = [
    {
      id: 1,
      title: "Product 1",
      price: 100,
      description: "This is a product",
      category: "category 1",
      image:
        "https://fastly.picsum.photos/id/263/1000/1000.jpg?hmac=OVTJAqwgRvgVZwRSco1erKwFCpZxRPv8vGN5SxW98Do",
    },
    {
      id: 2,
      title: "Product 2",
      price: 200,
      description: "This is a product",
      category: "category 2",
      image:
        "https://fastly.picsum.photos/id/393/1000/1000.jpg?hmac=sQe7c21Y3ZD8wVTRF5-DQlfrXwCYmXtIgw6FvYTcK3E",
    },
    {
      id: 3,
      title: "Product 3",
      price: 300,
      description: "This is a product",
      category: "category 3",
      image:
        "https://fastly.picsum.photos/id/292/1000/1000.jpg?hmac=QeyjLn2oy_HT-np8SseXf6F4wcbQgeIvnuqUQTh9PlQ",
    },
    {
      id: 4,
      title: "Product 4",
      price: 400,
      description: "This is a product",
      category: "category 4",
      image:
        "https://fastly.picsum.photos/id/957/1000/1000.jpg?hmac=vMnXVsOlZAJbhWzIdk00dVfUTndzxoaOjYFtFAllROo",
    },
    {
      id: 5,
      title: "Product 5",
      price: 500,
      description: "This is a product",
      category: "category 5",
      image:
        "https://fastly.picsum.photos/id/482/1000/1000.jpg?hmac=U7Leh7lZ7u3aag0lZIvp-Be47_Hy2mJ-VYjd8q7qAnM",
    },
  ];

  const [show, setShow] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  console.log(show, index);
  return (
    <div>
      <Navbar />
      {show ? (
        <ProductModal setShow={setShow} product={products[index]} />
      ) : null}

      <div className="flex flex-row gap-x-4 justify-evenly flex-wrap px-2 max-w-[90vw] mx-auto">
        {products.map((product, idx) => (
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
