const assert = require("assert");
const ganache = require("ganache-cli");
const { before } = require("mocha");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let inbox;
before(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  console.log(accounts);
  inbox = new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(true);
    console.log(inbox);
  });
});
