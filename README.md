# Simple Ethereum Oracle

This repository contains a simple Ethereum oracle that fetches data from an external API and feeds it to a smart contract using `ethers.js`. This project is intended for educational purposes to demonstrate how to create and use oracles in Ethereum smart contracts.

## Features

- Fetches data from an external API.
- Updates the smart contract with the fetched data.
- Uses `ethers.js` for blockchain interactions.
- Simple and easy-to-understand implementation.

## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)
- An Infura project ID
- An Ethereum wallet private key
- An Ethereum smart contract deployed on the mainnet
- Hardhat Framework, but you can use any other tool like Remix, Truffle, or even deploy it manually. 

## Getting Started

### 0. Setting Up The Data Provider
To Setup the dataprovider you need to follow the instructions on the [`Football Data Provider/`](https://github.com/AnasElii/Ethers_Oracle/tree/master/Football_Data_Provider) directory.

### 1. Clone the Repository

```bash
git clone https://github.com/AnasElii/ethers_oracle.git
cd ethers_oracle
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environmentt Varaibles
Create a .env file in the root directory of the project and add the following environment variables:

```bash
INFURA_PROJECT_ID=your_infura_project_id
PRIVATE_KEY=your_private_key
CONTRACT_ADDRESS=your_contract_address
```

### 4. Update Contract ABI
Replace the contractABI in index.js with your smart contract's ABI.

### 5. Run the Oracle Service

```bash
node index.js
```

This will start the oracle service, which will fetch data from the specified API and update the smart contract every 1 minutes because Football-data.org only allow us to fetch data each minute.

## Smart Contract

The smart contract (On-Chain Component) used in this project is a simple contract that allows the owner to update its data. Below is an example of the smart contract:

```bash
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleOracle is Ownable {
    uint256 public data;

    event DataUpdated(uint256 indexed newData);

    function updateData(uint256 _data) public onlyOwner {
        data = _data;
        emit DataUpdated(_data);
    }
}
```

Deploy this contract using a tool like Remix, Hardhat, or Truffle, and get the contract address to use in your .env file.

## Contributing
Feel free to fork this repository and submit pull requests. Any improvements or suggestions are welcome!

## License
This project is licensed under the MIT License.

```bash
Feel free to adjust any parts of the description and README to better suit your specific project details.
```