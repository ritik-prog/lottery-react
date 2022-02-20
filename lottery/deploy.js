const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider({
  mnemonic: {
    phrase:
      "category doll phrase nation item coyote crash inmate strike sick crater anchor",
  },
  providerOrUrl:
    "https://rinkeby.infura.io/v3/87bbdb3b5d334bf1817dd9932344a906",
});

const web3 = new Web3(provider);

let accounts;

const deploy = async () => {
  accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account " + accounts[0]);
  try {
    const inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode })
      .send({
        gas: '1000000',
        from: accounts[0],
      });

    console.log(interface)
    console.log("Contract deployed to ", inbox.options.address);
  } catch (error) {
    console.log(error);
  }
};

deploy();
