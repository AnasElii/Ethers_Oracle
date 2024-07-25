const ethers = require('ethers');
const axios = require('axios');
const SimpleOracle = require('./artifacts/contracts/SimpleOracle.sol/SimpleOracle.json'); // Replace this with ur Smart Contract Artifact
require('dotenv').config();

const provider = new ethers.InfuraProvider('sepolia', process.env.INFURA_API_KEY);
const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);

const contractABI = SimpleOracle.abi; // Replace this with ur Smart Contract ABI
/*
// Or you can simply call the ABI only
const contractABI = [];
*/

const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

async function fetchData() {
    try {
        const response = await axios.get('http://localhost:3000/standings');
        const data = response.data;

        // Update the samrt contract with the new data
        const tx = await contract.updateData(data.founded);
        const receipt = await tx.wait();
        console.log('Data updated:', receipt);
    } catch (error) {
        console.error('Error fetching or updating data:', error);
    }
}

// Listen for new blocks
function HandleListener() {
    const contractWithProvider = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, provider);

    contractWithProvider.on("DataUpdated", async (newData) => {
        console.log('Listner/ Data updated:', newData);
    });
}

HandleListener();

// Fetch data every minute
setInterval(fetchData, 1 * 60 * 1000);

fetchData();