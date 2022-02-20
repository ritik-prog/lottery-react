import React, { useEffect, useState } from "react";
import web3 from "./web3";
import lottery from "./lottery";

function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');
  const [value, setValue] = useState();
  const [message, setMessage] = useState('');
  async function getData() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    setManager(manager);
    setPlayers(players);
    setBalance(balance);
  }
  useEffect(() => {
    getData();
  }, [getData]);
  const onSubmit = async(e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setMessage("Waiting on transaction success...");
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value,'ether')
    }) 
    setMessage("you have been entered!");
    getData();
  }

  const pickWinner = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setMessage("Picking a winner...");
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    setMessage("Winner is picked!");
    getData();
  };

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}.
        There are currently {players.length} people entered,
        competing to win {web3.utils.fromWei(balance,'ether')} ether!
      </p>
      <hr/>
      <form onSubmit={onSubmit}>
        <h4>want to try our luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value={value} onChange={(e)=>setValue(e.target.value)}/>
          <button>Enter</button>
        </div>
      </form>
      <hr/>
      <h4>Ready to pick a winner?</h4>
      <button onClick={pickWinner}>Pick a winner!</button>
      <hr/>
      <h1>{message}</h1>
      <hr/>
    </div>
  );
}

export default App;
