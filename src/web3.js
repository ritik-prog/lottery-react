import Web3 from "web3";

const web3 = new Web3(window.web3.currentProvider);

const getData = async () => {
  const web3 = new Web3(window.web3.currentProvider);
  const network = await web3.eth.net.getNetworkType();
  await window.ethereum.enable();
  const accounts = await web3.eth.getAccounts();
  console.log("TCL: getData -> network", network);
  console.log("TCL: getData -> accounts", accounts);
};

getData();

export default web3;
