export const CELCOCIRCLE_ADDRESS = "0x234eA58B434c9Dc9807Ed0c5dD578d5ad369D483";

export const CELCOCIRCLE_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "uint256", "name": "_contributionAmount", "type": "uint256" },
      { "internalType": "uint256", "name": "_maxMembers", "type": "uint256" }
    ],
    "name": "createCircle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_circleId", "type": "uint256" }],
    "name": "joinCircle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_circleId", "type": "uint256" }],
    "name": "contribute",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];
