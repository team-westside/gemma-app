import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineShareAlt } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
// import clsx from 'clsx'
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import abi from "../../data/jaAssusre.json";
import axios from "@/services/axios";

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

const ProductModal = ({ show, setShow, product }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [providerKey, setProviderKey] = React.useState("");
  const [provider, setProvider] = useState(null);
  const [accounts, setAccounts] = useState(0);
  const [transaction, setTransaction] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [user, setUser] = useState(null);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(localStorage.getItem("gemma-user"));
    }
  }, []);
  // console.log(user, product.ownerAddress);
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
      console.log(txHash.data);
      console.log(transactionData, normalData);
      var sendData = {
        productId: product.id,
        transactionId: txHash.data,
        from: normalData.transaction.from,
        to: normalData.transaction.to,
        hex_value: txHash.value._hex,
        hash: txHash.hash,
      };
      // setDbData({
      //   productId: product.id,
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
      console.log(product);
      const transaction = {
        to: product.productOwnerAddress,
        value: ethers.utils.parseEther(product.productPrice),
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
            product: product,
          });
          console.log("Transaction sent: " + signedTransaction.hash);
          var data = {
            transaction: signedTransaction,
            product: product,
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
    <div className="w-[100vw] h-[100vh] transition-all overflow-y-hidden fixed top-0 left-0 z-[100] bg-[#00000195] backdrop-blur-sm flex flex-row justify-center items-center">
      <div
        id="product-modal"
        className="w-[50vw] h-[60vh] bg-white mx-auto my-auto p-5 slide-in-top fixed flex flex-row"
      >
        <div>
          {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
                {product?.forSale ? (
                  <button
                    id="transition-modal-description"
                    className=" mt-3 w-full text-center outline-black hover:bg-[#00000140] bg-black hover:text-black text-white p-3 mx-auto transition-all"
                    sx={{ mt: 2 }}
                    onClick={handleClick}
                  >
                    Confirm Transaction ETH {product.productPrice}
                  </button>
                ) : (
                  <div>Product is not up for sale</div>
                )}
              </Box>
            </Fade>
          </Modal>
        </div>
        <div
          className={"text-3xl hover:opacity-80 transition-all cursor-pointer"}
          onClick={() => {
            if (typeof document !== undefined) {
              const doc = document.getElementById("product-modal");
              doc.classList.remove("slide-in-top");
              doc.classList.add("slide-out-bottom");
              setTimeout(() => {
                setShow(false);
              }, 500);
              // setShow(false)
            }
          }}
        >
          <AiOutlineClose />
        </div>
        <div className="flex flex-row mt-10 w-full gap-x-5">
          <div className="max-w-[20vw] object-fit max-h-[90%] mt-5">
            <img src={product?.productImages[0]} />
          </div>
          <div className="flex flex-col w-full mt-5 justify-between pb-12">
            <div className="flex flex-row justify-between items-center w-[100%] flex-wrap">
              <div className="text-2xl font-bold basis-[60%]">
                {product?.productName}
              </div>
              <div className="text-2xl">ETH {product?.productPrice}</div>
            </div>
            <div className="text-xl mt-2 text-[#00000060] flex flex-row flex-wrap">
              {product?.categoryName}
            </div>
            <div className="text-l mt-4 flex flex-row flex-wrap">
              {product?.productDescription}
            </div>
            <div className="flex flex-row justify-center items-center w-[100%] mt-5 gap-x-3 mx-auto">
              <div className="">
                {product?.forSale &&
                String(user).toLowerCase() !==
                  String(product.productOwnerAddress).toLowerCase() ? (
                  <button
                    className="text-[#ffffff] bg-[#323232] text-xs px-10 py-2 border-2 border-black hover:text-[#323232] hover:bg-[#ffffff] hover:border-black-500"
                    onClick={handleOpen}
                  >
                    Buy Now
                  </button>
                ) : (
                  <div className="text-[#ffffff] bg-[#323232] text-xs px-10 py-2 border-2 border-black hover:border-black-500">
                    Product is not up for sale
                  </div>
                )}
              </div>

              <div>
                <Link href={`/products/${product?.id}`}>
                  <div className="text-[#323232] bg-[#ffffff] text-xs px-10 py-2 border-2 border-black border-opacity-100">
                    View More
                  </div>
                </Link>
              </div>
              <div>
                <button className="text-[#323232] bg-[#ffffff] text-md px-4 py-2 border-2 border-black border-opacity-100">
                  <FiShare />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
