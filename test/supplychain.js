const MainChain = artifacts.require('./Core/MainChain.sol')
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract('Supplychain Contracts:', async (accounts) => {
    let supplyChain
    const Deployer = accounts[0]
    const Designer = accounts[1]
    const Regulator = accounts[2]
    const Manufacturer = accounts[3]
    const Manufacturer_Owner = accounts[4]
    const Manufacturer_Partner = accounts[5]
    const Distributor = accounts[6]
    const Retailer = accounts[7]
    const Consumer = accounts[8]

    const DrugDesign1 = {
        udpc: 1,
        designerName: 'GSK',
        name: 'Amoxil',
        description: 'Amoxil is used to treat many different types of infection caused by bacteria.',
        notes: 'Do not use Amoxil if you are allergic to amoxicillin or to any other penicillin antibiotic.',
        salePrice: web3.utils.toWei('10', "ether"),
        partnerShares: '85',
        restrictedShares: 95,
    }

    const DrugDesign2 = {
        udpc: 2,
        designerName: 'AAM',
        name: 'AAA',
        description: 'Empty',
        notes: 'Empty',
    }

    const TestCase1 = {
        description: 'Empty',
        isPassed: true,
        notes: 'Empty',
    }
    const TestCase2 = {
        description: 'Empty',
        isPassed: false,
        notes: 'Empty',
    }

});
