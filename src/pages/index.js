import Image from "next/image";
import React from "react";
// import { Inter } from "next/font/google";
import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Category from "@/components/Categories/Categories";
import Categories from "@/components/Categories/Categories";
// const inter = Inter({ subsets: ["latin"] });
import API from "@/services/axios";
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

  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    API.get("/category")
      .then((res) => {
        console.log(res);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(categories);

  return (
    <div className="max-w-[100vw]">
      <Navbar />
      <Categories data={categories} />
      <Footer />
    </div>
  );
}
