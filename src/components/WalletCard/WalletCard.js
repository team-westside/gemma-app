import React, { useEffect, useState } from "react";
// import { Button } from '@material-ui/core';
import Ethereum from "../../assets/Ethereum.png";
import { ethers } from "ethers";
import axios from "axios";
import { stringify } from "flatted";
import abi from "../../data/jaAssusre.json";
import { toast } from "react-toastify";
// const provider = new ethers.providers.Web3Provider(window.Ethereum);
// const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [accounts, setAccounts] = useState(0);
  const [transaction, setTransaction] = useState(null);
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
  //   console.log(provider);
  //   let provider = new ethers.providers.Web3Provider(web3.currentProvider);
  const connectwalletHandler = () => {
    if (window.Ethereum) {
      console.log(provider);
      provider.send("eth_requestAccounts", []).then(async () => {
        console.log(provider);
        await accountChangedHandler(provider.getSigner());
      });
    } else {
      setErrorMessage("Please Install Metamask!!!");
    }
  };
  const accountChangedHandler = async (newAccount) => {
    const address = await newAccount.getAddress();
    setDefaultAccount(address);
    const balance = await newAccount.getBalance();
    console.log(balance);
    setUserBalance(ethers.utils.formatEther(balance));
    await getuserBalance(address);
  };
  const getuserBalance = async (address) => {
    const balance = await provider
      .getBalance(address, "latest")
      .then((data) => {
        console.log(data);
        setUserBalance(ethers.utils.formatEther(data));
        return data;
      });
    // console.log(balance);
    // return balance;
  };
  //   console.log(CONTRACT_ADDRESS);
  useEffect(() => {
    if (defaultAccount) {
      const balance = getuserBalance(defaultAccount);
      console.log(balance);

      //   setUserBalance(ethers.utils.formatEther(balance));
    }
  }, [defaultAccount]);
  //   useEffect(() => {
  //     accountChangedHandler(defaultAccount);
  //   }, [defaultAccount]);
  const handleData = async (data) => {
    toast.info("Transaction in progress");
    const res = await data.wait();
    setTransaction(res);
    toast.success("Transaction Successfull");
    console.log(res);
    return res;
  };
  //   toast.success("Transaction Successfull");
  const handleClick = async () => {
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
    const check = false;
    console.log(check);
    if (!check) {
      const result = await contract.registerUser().then((data) => {
        handleData(data);
        console.log(data);
        //   console.log(data.wait());
      });
      console.log("Data added to Blockchain!!");
      console.log(result);
    } else {
      toast.info("User Already Registered");
    }
  };
  return (
    <div className="WalletCard">
      {/* <h3 className="h4">Welcome to a decentralized Application</h3> */}
      <div
        className="w-[10px] h-[10px] rounded-full absolute right-2 top-2"
        style={{
          background: defaultAccount ? "#A5CC82" : "red",
        }}
      ></div>
      {!defaultAccount && (
        <button
          onClick={connectwalletHandler}
          className="bg-[#ecab4f] text-white cursor-pointer mx-auto px-5 py-2 hover:opacity-75 transition-all"
        >
          Connect Wallet
        </button>
      )}
      {/* <button
        style={{ background: defaultAccount ? "#A5CC82" : "white" }}
        onClick={connectwalletHandler}
      >
        {defaultAccount ? "Connected!!" : "Connect"}
      </button> */}
      <div className="displayAccount">
        <h4 className="walletAddress">
          Address:{String(defaultAccount).substring(0, 10)}xxxx
        </h4>
        <div className="flex flex-row items-center justify-center gap-x-4">
          <img src={Ethereum.src} className="App-logo w-[20px]" alt="logo" />
          <div className="flex flex-col justify-center">
            <h3 className="font-bold text-lg">Wallet</h3>
            <h3>
              <span className="font-bold">ETH</span>{" "}
              {String(userBalance).substring(0, 6)}
            </h3>
          </div>
          {/* <br /> */}
        </div>
      </div>
      {errorMessage}
      <div onClick={handleClick}>Click Me</div>
      {/* {provider && stringify(provider)} */}
    </div>
  );
};
export default WalletCard;
