// ethereumController.js
import Web3 from "web3";
import { isAddress } from "web3-validator";

const infuraEndpoint = `https://mainnet.infura.io/v3/0eb9c86cf304466592309285e032846a`;

const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndpoint));

export const getBalance = async (req, res) => {
  try {
    const account = req.params.account;

    //check if there is parameter account
    if (!account) {
      return res.status(400).json({ error: "Specify Account Number!" });
    }

    //check if the account is a valid ethereum address
    if (!isAddress(account)) {
      return res.status(400).json({ error: "Invalid Ethereum address" });
    }

    //get balance of the account
    const balance = await web3.eth.getBalance(account);
    const balanceInEther = web3.utils.fromWei(balance, "ether");

    //return the balance in ether
    res.status(200).json({ balance: balanceInEther });
  } catch (error) {
    console.error("Error retrieving balance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
