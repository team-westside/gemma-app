import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import Link from "next/link";
const console = () => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(localStorage.getItem("gemma-user"));
      if (!localStorage.getItem("gemma-user")) {
        window.alert("Please login to continue");
        router.push("/");
      }
      if (
        String(user).toLowerCase() ==
        "0x801072Dca8ADb88afB9D32Bc01b281b7A09e2779".toLowerCase()
      ) {
        setAdmin(true);
      }
    }
  }, []);
  const [admin, setAdmin] = React.useState(false);

  const links = [
    {
      name: "My Products",
      link: "/console/products",
    },
    {
      name: "My Transactions",
      link: "/console/transactions",
    },
  ];
  //   const user = localStorage.getItem("gemma-user");
  return (
    <div>
      <Navbar />
      <div className="text-center font-bold text-3xl">User Console</div>
      {/* <div>{user}</div> */}
      <div className="flex flex-row justify-center gap-x-7 mt-8">
        {links.map((item) => {
          return (
            <Link href={item.link}>
              <div className="w-[200px] h-[200px] flex text-2xl flex-row justify-center items-center border-2 border-black hover:border-dotted transition-all cursor-pointer">
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default console;
