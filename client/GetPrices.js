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

// Convert the amount in
const getPrices = async (amountInHuman) => {
  const contractToken = new ethers.Contract(addressFrom, erc20ABI, provider);
  const decimals = await contractToken.decimals();
  const amountIn = ethers.parseUnits(amountInHuman, decimals).toString();

  // Get Amounts out
  const amountsOut = await contractRouter.getAmountsOut(amountIn, [
    addressFrom,
    addressTo,
  ]);

  // Get decimals - AddressTo
  const contractToken2 = new ethers.Contract(addressTo, erc20ABI, provider);
  const decimals2 = await contractToken2.decimals();

  // Convert amountsOut to human readable
  const amountOutInHuman = ethers.formatUnits(
    amountsOut[1].toString(),
    decimals2
  );
  console.log(amountOutInHuman);
};

const amountInHuman = "500";
getPrices(amountInHuman);
