import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import API from "@/services/axios";
import P404 from "@/pages/404";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { toast } from "react-toastify";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import { toast } from "react-toastify";
import abi from "../../../data/jaAssusre.json";
import axios from "@/services/axios";
import Link from "next/link";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const [imageIndex, setImageIndex] = React.useState(0);

  // console.log(id);
  const [productData, setProduct] = React.useState({});
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(localStorage.getItem("gemma-user"));
    }
  }, []);

  const handleSale = (saleStatus) => {
    API.put(`/product/${productData.id}`, {
      forSale: saleStatus,
    }).then((res) => {
      if (saleStatus) toast.success("Product Put up for Sale");
      else toast.success("Product Removed from Sale");
      setProduct({ ...productData, forSale: saleStatus });
    });
  };
  React.useEffect(() => {
    API.get(`/product/${id}`)
      .then((res) => {
        // console.log(res);
        if (res.data.productName) {
          setProduct(res.data);
          setSale(res.data.forSale);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const [sale, setSale] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [providerKey, setProviderKey] = React.useState("");
  const [provider, setProvider] = useState(null);
  const [accounts, setAccounts] = useState(0);
  const [transaction, setTransaction] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const getUser = async (provider) => {
    const account = await provider.send("eth_requestAccounts").then((data) => {
      //   console.log(data);
      setAccounts(data);
      setDefaultAccount(data[0]);
    });
    return account;
  };
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const ethers = require("ethers");
      //   console.log(ethers, ethers.provider, window.ethereum);
      if (window.ethereum && window.ethereum.isMetaMask) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        // request user's permission to connect their MetaMask account
        getUser(provider);

        // window.alert(`Connected account: ${accounts}`);
      } else {
        window.alert("Please install MetaMask");
      }
    }
  }, []);
  const [transactionData, setTransactionData] = useState({});
  const handleData = async (data) => {
    toast.info("Transaction in progress");
    // const res = await data.wait();
    // setTransaction(res);
    toast.success("Contract Successfull");
    // console.log(res);
    // return res;
  };
  const [dbData, setDbData] = useState({});

  const addDataToDb = async (sendData) => {
    const res = await axios.post("/transaction", sendData);
    console.log(res);
  };

  const onSuccessTransaction = async (hereData) => {
    // if (transactionData) {
    const ethers = require("ethers");
    const data = JSON.stringify(hereData);
    const normalData = hereData;
    const contractAddress = "0x4Dbd29725Ad734280Db4F57F5CB387E2a042A6E3";
    if (!contractAddress) {
      window.alert("Please set the contract address in the .env file");
    }
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // const res = await contract.checkUserRegistration();
    // console.log(res);
    console.log("contract created");
    await provider.send("eth_requestAccounts", []); // <- this promps user to connect metamask
    // console.log(signer);
    // const check = await contract.checkUserRegistration();
    // const check = false;
    // console.log(check);
    // if (!check) {
    const result = await contract.storeString(data).then((txHash) => {
      console.log(txHash);
      console.log(transactionData, normalData);
      var sendData = {
        productId: productData.id,
        transactionId: txHash.data,
        from: recipient,
        to: normalData.transaction.to,
        hex_value: txHash.value._hex,
        hash: txHash.hash,
      };
      // setDbData({
      //   productId: productData.id,
      //   transactionId: txHash.data,
      //   from: normalData.transaction.from,
      //   to: normalData.transaction.to,
      // });

      // const res = await axios.post("/transaction", dbData);;
      addDataToDb(sendData);
      // console.log(data.value._hex);
      handleData(data);
      //   console.log(data.wait());
    });

    // const res = await contract.getString(k).then((data) => {
    //   console.log(data);

    //   // console.log(data.value._hex);
    //   handleData(k);
    //   //   console.log(data.wait());
    // });

    console.log("Data added to Blockchain!!");
    console.log(result);
    // } else {
    // toast.info("User Already Registered");
    // }
    // }
  };
  const handleClick = () => {
    if (typeof document !== undefined) {
      const ethers = require("ethers");
      const privateKey = providerKey;
      const signer = new ethers.Wallet(privateKey, provider);
      // console.log(productData);
      const transaction = {
        to: productData.productOwnerAddress,
        value: ethers.utils.parseEther("0"),
        gasPrice: ethers.utils.parseUnits("20", "gwei"),
      };
      console.log(transaction);
      // Sign and send the transaction
      signer
        .sendTransaction(transaction)
        .then((signedTransaction) => {
          console.log(signedTransaction);
          setTransactionData({
            transaction: signedTransaction,
            product: productData,
            transferredTo: recipient,
          });
          console.log("Transaction sent: " + signedTransaction.hash);
          var data = {
            transaction: signedTransaction,
            product: productData,
          };
          onSuccessTransaction(data);
          toast.success("Transaction Succesfull");
          setOpen(false);
        })
        .catch((error) => {
          console.error("Error sending transaction: " + error);
        });
    }
  };

  return (
    <div>
      <Navbar />
      {String(productData.productOwnerAddress).toLowerCase() ==
      String(user).toLowerCase() ? (
        <div className="flex flex-col w-[80%] mx-auto border-2 border-black p-5 justify-center items-center m-5">
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Enter Receipient Address
                </Typography>
                <input
                  type="text"
                  className="w-full outline-black p-2 border-2 border-black"
                  autoComplete={false}
                  autoFill={false}
                  onChange={(e) => {
                    setRecipient(e.target.value);
                  }}
                />
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Enter your private key to proceed
                </Typography>
                <input
                  type="password"
                  className="w-full outline-black p-2 border-2 border-black"
                  autoComplete={false}
                  autoFill={false}
                  onChange={(e) => {
                    setProviderKey(e.target.value);
                  }}
                />
                {/* {productData.forSale ? ( */}
                <button
                  id="transition-modal-description"
                  className=" mt-3 w-full text-center outline-black hover:bg-[#00000140] bg-black hover:text-black text-white p-3 mx-auto transition-all"
                  sx={{ mt: 2 }}
                  onClick={handleClick}
                >
                  Gift Product
                  {/* Confirm Transaction ETH {productData.productPrice} */}
                </button>
                {/* ) : ( */}
                {/* <div>Product is not up for sale</div> */}
                {/* )} */}
              </Box>
            </Fade>
          </Modal>
          <div>Owner Console</div>
          <div className="flex flex-row gap-x-5">
            {productData.forSale ? (
              <button
                className=" text-center outline-black hover:bg-[#00000140] bg-black hover:text-black text-white p-3 mx-auto transition-all"
                onClick={() => {
                  handleSale(false);
                }}
              >
                Remove from Sale
              </button>
            ) : (
              <button
                className="text-center outline-black hover:bg-[#00000140] bg-black hover:text-black text-white p-3 mx-auto transition-all"
                onClick={() => {
                  handleSale(true);
                }}
              >
                Add for Sale
              </button>
            )}
            <button
              className=" text-center outline-black hover:bg-[#00000140] bg-black hover:text-black text-white p-3 mx-auto transition-all"
              onClick={handleOpen}
            >
              Gift to a friend
            </button>
          </div>
        </div>
      ) : null}
      {productData.productName ? (
        <div className="flex flex-row">
          {/* Found */}
          <div className="flex flex-col flex-wrap">
            {productData.productImages.map((image, index) => {
              return (
                <img
                  className=" w-[100px] h-[100px]"
                  src={image}
                  alt={productData.productName}
                  key={index}
                  onClick={() => {
                    setImageIndex(index);
                  }}
                />
              );
            })}
          </div>
          <img
            src={productData.productImages[imageIndex]}
            alt=""
            className="h-[80vh]"
          />
          {/* {JSON.stringify(productData)} */}

          <div>
            <div className="text-[#32323270] px-10">
              {productData.categoryName}
            </div>
            <div className="flex flex-row flex-wrap">
              <div className="text-3xl font-bold px-10 basis-2/3">
                {productData.productName}
              </div>
              <div className="text-3xl px-10">
                ETH {productData.productPrice}
              </div>
              <div className="w-[80%] h-[2px] bg-[#00000150] opacity-50 mx-auto my-8" />
            </div>
            <div className="px-10">
              <div className="text-2xl">Description</div>
              <div className="text-lg flex flex-row flex-wrap">
                {productData.productDescription}
              </div>
              <Link href={url + "/doc"} target="_blank" className="mx-auto">
                <button className="px-5 py-2 border-2 mx-auto cursor-pointer transition-all hover:bg-[#ebae30] hover:text-white">
                  View DOC
                </button>
              </Link>
              {String(productData.productOwnerAddress).toLowerCase() ==
              String(user).toLowerCase() ? (
                <div className="flex flex-col">
                  <div className="text-2xl my-5">Product Owners</div>
                  <table className="text-center">
                    <thead>
                      <th className="text-center px-3 py-2 border-[1px] border-black">
                        Si
                      </th>
                      <th className="text-center px-3 py-2 border-[1px] border-black">
                        Address
                      </th>
                      <th className="text-center px-3 py-2 border-[1px] border-black">
                        Price
                      </th>
                    </thead>
                    <tbody>
                      {productData.ownersList.map((owner, index) => {
                        return (
                          <tr>
                            <td className="text-center px-3 py-2 border-[1px] border-black">
                              {index + 1}
                            </td>
                            <td className="text-center px-3 py-2 border-[1px] border-black">
                              {owner.owner}
                            </td>
                            <td className="text-center px-3 py-2 border-[1px] border-black">
                              {owner.price}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <P404 />
      )}
      <Footer />
    </div>
  );
};

export default index;
