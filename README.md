# drug-supply-chain
An Ethereum DApp that demonstrates a Supply Chain flow from a Designer of a drug along to the end user Buyer(consumer). Regulator whos responsable for approve the drug. Manufacturer can act as a owner of a drug design or bulid partner contract with a designer. A Distributor should act as middleman between manufacturer to retailer to last actor in the system consumer.

[Live demo on rinkeby network.])(https://drugn-drugz-ukdhcdvqtk.now.sh/)


## UML Architecture

### [Activity Diagram](architecture/ActivityDiagram.png)

### [Sequence Diagram](architecture/SequenceDiagram.png)

### [State Diagram](architecture/StateDiagram.png)

### [Class Diagram](architecture/ClassDiagram.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites
Please make sure you've already installed ganache-cli, Truffle and enabled MetaMask extension in your browser.
```
npm install -g ganache-cli truffle
```
or use npx befor every npm package comand.

clone this repository using Git.

install project packages for blockchain and frontend project
```
npm i 
cd frontend && npm i
```

## Start Development
Launch Ganache with unlimited gas (important), more balances.
```
npx ganache-cli --gasLimit=0x1fffffffffffff --allowUnlimitedContractSize -e 1000000000
```
start new terminal tab and start compiling contract codes
```
truffle compile
```
test contract using truffle 
```
truffle test
```
if you want to test it using front end migrate contract to ganache local network and make sure you copy some addresses to MetaTask. hence, first account (deployer) will has all the roles and he is the only one can approve or give regulator role to another address.
```
truffle migrate --reset
```
locate to frontend project and start development
```
cd frontend && npm start
```

## Libraries

- Partnerships: library keep track partner in a partnership contract with known share. I write it to make project less smaller and to try the power of spilted payment contract.
- Roles: library from Open Zeppelin contract thats keep track of a mapping list of address in any role based contract.
  

## IPFS


## Deployed Contract Address (Rinkeby)

[0x9c9b36c9b8049eb954fc2a8d73fc900132521f21](https://rinkeby.etherscan.io/address/0x9c9b36c9b8049eb954fc2a8d73fc900132521f21)


## TransctionsHash for Live Testing 

- Transaction Hash: [0x3fbb56cb35a990fa5d087f1945966902202e628a2758d443c90e1380e674d7ff](https://rinkeby.etherscan.io/tx/0x3fbb56cb35a990fa5d087f1945966902202e628a2758d443c90e1380e674d7ff) Event: Owned(udpc: 1 )
- Transaction Hash: [0xbe9078f85844da6070fd9247d79c5ece4b6481eadfbebcf021e157e46b54a772](https://rinkeby.etherscan.io/tx/0xbe9078f85844da6070fd9247d79c5ece4b6481eadfbebcf021e157e46b54a772) Event: TestCaseAdded(udpc: 1 )
- Transaction Hash: [0xe4a31ac3d5027009fb34c78f214f5343d2bd628545077e79656028037d3be54e](https://rinkeby.etherscan.io/tx/0xe4a31ac3d5027009fb34c78f214f5343d2bd628545077e79656028037d3be54e) Event: TestCaseAdded(udpc: 1 )
- Transaction Hash: [0xee98ab51f1b2deb513f7d566afe80914653b9e8700972ae0eecd50b98cfcec45](https://rinkeby.etherscan.io/tx/0xee98ab51f1b2deb513f7d566afe80914653b9e8700972ae0eecd50b98cfcec45) Event: Approved(udpc: 1 )
- Transaction Hash: [0xfe211fdba31ae2d6517e65a9d1b872aa3e940515dd0d5274966f1e62d4115a4a](https://rinkeby.etherscan.io/tx/0xfe211fdba31ae2d6517e65a9d1b872aa3e940515dd0d5274966f1e62d4115a4a) Event: UpForSale(udpc: 1 )
- Transaction Hash: [0x17f0142cc1718eb4000c93286f4f85e1f60c7ef8fb10510808bb3fa7d94ffbd0](https://rinkeby.etherscan.io/tx/0x17f0142cc1718eb4000c93286f4f85e1f60c7ef8fb10510808bb3fa7d94ffbd0) Event: DrugDesignPurchased(udpc: 1 )
- Transaction Hash: [0x1da58fb507fcede335aff9fc0d9c5569b7f978c5f500ac799d0482cefc0c7adc](https://rinkeby.etherscan.io/tx/0x1da58fb507fcede335aff9fc0d9c5569b7f978c5f500ac799d0482cefc0c7adc) Event: UpForPartnered(udpc: 1 )
- Transaction Hash: [0x746b585b05eb12179d057782f3f4c70804f9731bce51f9176e28cd146444b563](https://rinkeby.etherscan.io/tx/0x746b585b05eb12179d057782f3f4c70804f9731bce51f9176e28cd146444b563) Event: PartnerGained(udpc: 1 )
- Transaction Hash: [0x9cef61bda00f131dc8bcf62194d2f4f9ad653a71ff0c25cff8411e7fc65eab2d](https://rinkeby.etherscan.io/tx/0x9cef61bda00f131dc8bcf62194d2f4f9ad653a71ff0c25cff8411e7fc65eab2d) Event: Manufactured(slu: 1 )
- Transaction Hash: [0x8a2955c52b3b14460c88c65e7e8120727596185c58de3a251b31ff97f6989cbb](https://rinkeby.etherscan.io/tx/0x8a2955c52b3b14460c88c65e7e8120727596185c58de3a251b31ff97f6989cbb) Event: Packed(slu: 1 )
- Transaction Hash: [0x6e17ca02969f56b4616d46de7a749718135603d56cf12ffdc28cef5cad1d4b61](https://rinkeby.etherscan.io/tx/0x6e17ca02969f56b4616d46de7a749718135603d56cf12ffdc28cef5cad1d4b61) Event: ForSale(slu: 1 )
- Transaction Hash: [0x9e636dedf508696cb119e38bdf48bb9a061a43f1097e04fd9f5d247eb5432bd0](https://rinkeby.etherscan.io/tx/0x9e636dedf508696cb119e38bdf48bb9a061a43f1097e04fd9f5d247eb5432bd0) Event: Sold(slu: 1 )
- Transaction Hash: [0x1f0a0411198bed268ef9d950bf4dda5a096ee40cab3b77a77a2fd2f2b8897013](https://rinkeby.etherscan.io/tx/0x1f0a0411198bed268ef9d950bf4dda5a096ee40cab3b77a77a2fd2f2b8897013) Event: Shipped(slu: 1 )
- Transaction Hash: [0x1334ed469804dc86c7d31b3d604d717cf1a76791e1ec788c91f568c7149dd854](https://rinkeby.etherscan.io/tx/0x1334ed469804dc86c7d31b3d604d717cf1a76791e1ec788c91f568c7149dd854) Event: EnvUpdated(slu: 1 )
- Transaction Hash: [0x9f36d10f6a954551e20791ecd55cef1de11c56a683f8e4e3bdb18177f9574118](https://rinkeby.etherscan.io/tx/0x9f36d10f6a954551e20791ecd55cef1de11c56a683f8e4e3bdb18177f9574118) Event: EnvUpdated(slu: 1 )
- Transaction Hash: [0x3d9d3432bd21624487025d6e6f888509a324373d959e4562154b72fdee2273b3](https://rinkeby.etherscan.io/tx/0x3d9d3432bd21624487025d6e6f888509a324373d959e4562154b72fdee2273b3) Event: Received(slu: 1 )
- Transaction Hash: [0xd3a92744f4f0c976cc71ee229c78edda21e3b58e92a9d086c2d247b7af63ccff](https://rinkeby.etherscan.io/tx/0xd3a92744f4f0c976cc71ee229c78edda21e3b58e92a9d086c2d247b7af63ccff) Event: EnvUpdated(slu: 1 )
- Transaction Hash: [0xaa132d3cbd49bff3c623f92acb11d3a078f1d8c5da0e7aa8c365f4bde80c8fb6](https://rinkeby.etherscan.io/tx/0xaa132d3cbd49bff3c623f92acb11d3a078f1d8c5da0e7aa8c365f4bde80c8fb6) Event: Purchased(pku: 1 )
- Drug Design Data: currentOwner: 0x65F97478AEB4b634Cc2F8399a6c9d6Ec5eCDB866, designerId: 0x5F3383cA12B053fD3254b358794Fc761DD961721, designerName: Eli Lilly, drugName: Nabilone, currentState: Approved, forSale: true, salePrice: 2000000000000000000, partnershipState: Open, partnershipShares: 85, numberOfTests: 2, numberOfManufacturers: 1,
- Drugs Load Data: quantity: 50, _udpc: 1, state: Received, currentOwner: 0x0D3271dc3cb54E9e20092Db0b60B07cEB1de62a4, manufacturerId: 0x5F3383cA12B053fD3254b358794Fc761DD961721, deistributorId: 0x0D3271dc3cb54E9e20092Db0b60B07cEB1de62a4, retailerId: 0x65F97478AEB4b634Cc2F8399a6c9d6Ec5eCDB866, price: 100000000000000000,
- Drug Item Data: _udpc: 1, _slu: 1, state: Purchased, currentOwner: 0x0D3271dc3cb54E9e20092Db0b60B07cEB1de62a4, manufacturerId: 0x5F3383cA12B053fD3254b358794Fc761DD961721, deistributorId: 0x0D3271dc3cb54E9e20092Db0b60B07cEB1de62a4, retailerId: 0x65F97478AEB4b634Cc2F8399a6c9d6Ec5eCDB866, price: 100000000000000000, packingTimeStamp: 1552331048, numberOfupdate: 3, timeStamps: 1552331363,1552331408,1552331498, temprtures: 33,22,33, humiditys: 22,11,19, updaterAddresses: 0x0D3271dc3cb54E9e20092Db0b60B07cEB1de62a4,0x5F3383cA12B053fD3254b358794Fc761DD961721,0x65F97478AEB4b634Cc2F8399a6c9d6Ec5eCDB866,


---
## Built With ❤️ Using:
* [**Udacity**](https://www.udacity.com/) 
* [**Ethereum**](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts.
* [**Truffle**](https://truffleframework.com/) - development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM).
* [**OpenZeppelin**](https://openzeppelin.org/) -  A library for secure smart contract development. It provides implementations of standards like ERC20 and Ownable.
* [**React**](https://openzeppelin.org/) -  A library for secure smart contract development. It provides implementations of standards like ERC20 and Ownable.
* [**OpenZeppelin**](https://openzeppelin.org/) -  A library for secure smart contract development. It provides implementations of standards like ERC20 and Ownable.
