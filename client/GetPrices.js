const ethers = require("ethers");
const { erc20ABI, factoryABI, pairABI, routerABI } = require("./AbiList");
const {
  addressFactory,
  addressRouter,
  addressFrom,
  addressTo,
} = require("./AddressList");

// RPC Provider
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org");

// Connect to Factory
const contractFactory = new ethers.Contract(
  addressFactory,
  factoryABI,
  provider
);

// Connect to Router
const contractRouter = new ethers.Contract(addressRouter, routerABI, provider);

// Connect to blockchain
const getPrices = async (amountInHuman) => {
  const contractToken = new ethers.Contract(addressFrom, erc20ABI, provider);
  const decimals = await contractToken.decimals();
  const amountIn = ethers.parseUnits(amountInHuman, decimals).toString();

  console.log(amountIn);
};

const amountInHuman = "500";
getPrices(amountInHuman);
