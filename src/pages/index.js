import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Product from "@/components/Product/Product";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const products = [
    {
      id: 1,
      title: "Product 1",
      price: 100,
      description: "This is a product",
      category: "category 1",
      // image: "/images/product-1.jpg",
    },
    {
      id: 2,
      title: "Product 2",
      price: 200,
      description: "This is a product",
      category: "category 2",
      // image: "/images/product-2.jpg",
    },
    {
      id: 3,
      title: "Product 3",
      price: 300,
      description: "This is a product",
      category: "category 3",
      // image: "/images/product-3.jpg",
    },
    {
      id: 4,
      title: "Product 4",
      price: 400,
      description: "This is a product",
      category: "category 4",
      // image: "/images/product-4.jpg",
    },
    {
      id: 5,
      title: "Product 5",
      price: 500,
      description: "This is a product",
      category: "category 5",
      // image: "/images/product-5.jpg",

    },
  ];
  return (
    <div className="max-w-[100vw]">
      <Navbar />
      <div className="flex flex-row gap-x-4 justify-evenly flex-wrap px-2 max-w-[90vw] mx-auto">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <Footer />
      {/* <Footer /> */}
    </div>
  );
}
