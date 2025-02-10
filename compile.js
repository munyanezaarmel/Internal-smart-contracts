const path = require("path");
const fs = require("fs");
const solc = require("solc");

// Path to Inbox.sol
const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

// Solidity compiler input format
const input = {
  language: "Solidity",
  sources: {
    "Inbox.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode.object"],
      },
    },
  },
};

// Compile contract
const output = JSON.parse(solc.compile(source));


if (!output.contracts || !output.contracts["Inbox.sol"] || !output.contracts["Inbox.sol"].Inbox) {
  throw new Error("Compilation error: Contract not found!");
}

const { abi, evm } = output.contracts["Inbox.sol"].Inbox;

// Ensure bytecode is not empty
if (!evm.bytecode.object || evm.bytecode.object.length === 0) {
  throw new Error("Error: Compiled bytecode is empty!");
}

console.log("ABI:", abi);
console.log("Bytecode:", evm.bytecode.object);

// Export contract details
module.exports = { abi, bytecode: evm.bytecode.object };
