const path = require('path');
const fs = require('fs');
const solc = require('solc');

// Get the path to the Solidity file
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

// Read the Solidity code from the file
const source = fs.readFileSync(inboxPath, 'utf8');

// Correct input format for Solidity compiler
const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode.object'], // Only selecting necessary outputs
            },
        },
    },
};

// Compile the contract
const output = JSON.parse(solc.compile(JSON.stringify(input)));


// Extract compiled contract details
const contract = output.contracts['Inbox.sol'].Inbox;

// Display ABI and bytecode
console.log('ABI:', contract.abi);
console.log('Bytecode:', contract.evm.bytecode.object);

// Export for deployment
module.exports = contract;
