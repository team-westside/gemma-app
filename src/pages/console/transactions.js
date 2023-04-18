import React from "react";
import API from "@/services/axios";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const transactions = () => {
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
  console.log(user);

  const [transactions, setTransactions] = React.useState([]);
  React.useEffect(() => {
    API.get(`/transactions/${user}`)

      .then((res) => {
        // console.log(res);
        if (res.data.length > 0) {
          setTransactions(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);
  console.log(transactions);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <div className="text-3xl font-bold my-5">Transactions</div>
        {/* make table using transactions */}
        <table className="mx-auto my-10">
          <thead>
            <tr>
              <th className="px-7 py-4 text-center border-[1px] border-black font-bold">
                From
              </th>
              <th className="px-7 py-4 text-center border-[1px] border-black font-bold">
                To
              </th>
              <th className="px-7 py-4 text-center border-[1px] border-black font-bold">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr>
                  <td className="px-7 py-4 text-center border-[1px] border-black">
                    {transaction.from}
                  </td>
                  <td className="px-7 py-4 text-center border-[1px] border-black">
                    {transaction.to}
                  </td>
                  <td className="px-7 py-4 text-center border-[1px] border-black">
                    {transaction.hash ? (
                      <a
                        href={`https://sepolia.etherscan.io/tx/${transaction.hash}`}
                        target="_blank"
                        className="text-blue-500 hover:text-blue-700 hover:underline"
                      >
                        {String(transaction.from).toLowerCase() ==
                        String(user).toLowerCase()
                          ? "Outgoing"
                          : String(transaction.to).toLowerCase() ==
                            String(user).toLowerCase()
                          ? "Incoming"
                          : "External"}
                      </a>
                    ) : String(transaction.from).toLowerCase() ==
                      String(user).toLowerCase() ? (
                      "Outgoing"
                    ) : String(transaction.to).toLowerCase() ==
                      String(user).toLowerCase() ? (
                      "Incoming"
                    ) : (
                      "External"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default transactions;
