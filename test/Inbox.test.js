const assert = require('assert');
const ganache = require('ganache-cli');
const { before } = require('mocha');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
before(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    console.log(accounts);
  });

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(true);
    });
})