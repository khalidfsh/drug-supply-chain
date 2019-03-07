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



        
beforeEach('setup contract:', async () => {
    supplyChain = await MainChain.deployed();
});

// afterEach(async () => {
//     await supplyChain.kill({from: deployer});
// });



// ACCESS CONTROL Tests
it("ACCESS: Deployer gets all roles, `whoAmI()`", async() => {
    let rollsChecker = await supplyChain.whoAmI.call({from: Deployer})
    for (var key in rollsChecker) {
        assert.isTrue(rollsChecker[key])
    }
});


it("ACCESS: Designer Role: any user can assign this role,`DesignerAdded` emitted, `assignMeAsDesigner()`", async() => {
    let tx = await supplyChain.assignMeAsDesigner({from: Designer})
    truffleAssert.eventEmitted(tx, 'DesignerAdded', (ev) => {
        return ev.account === Designer;
    })
    
    assert.isTrue(await supplyChain.amIDesigner.call({from: Designer}))     
});
it("ACCESS: Designer Role: user can renounce this role,`DesignerRemoved` emitted, `renounceMeFromDesigner()`", async() => {
    let tx = await supplyChain.renounceMeFromDesigner({from: Deployer})
    truffleAssert.eventEmitted(tx, 'DesignerRemoved', (ev) => {
        return ev.account === Deployer;
    })
    
    assert.isFalse(await supplyChain.amIDesigner.call({from: Deployer}))     
});


it("ACCESS: Regulator Role: any user cannot assign this role, revert massage, `addRegulator()`", async() => {
    await truffleAssert.reverts(
        supplyChain.addRegulator(Regulator, {from: Regulator}),
        'Not A Regulator!'
    )
    assert.isFalse(await supplyChain.amIRegulator.call({from: Regulator}))
});
it("ACCESS: Regulator Role: another regulator can add user to this role, `RegulatorAdded` emitted, `addRegulator()`", async() => {
    let tx = await supplyChain.addRegulator(Regulator, {from: Deployer})
    truffleAssert.eventEmitted(tx, 'RegulatorAdded', (ev) => {
        return ev.account === Regulator;
    })
    assert.isTrue(await supplyChain.amIRegulator.call({from: Regulator}))
});
it("ACCESS: Regulator Role: user can renounce this role,`RegulatorRemoved` emitted, `renounceMeFromRegulator()`", async() => {
    let tx = await supplyChain.renounceMeFromRegulator({from: Deployer})
    truffleAssert.eventEmitted(tx, 'RegulatorRemoved', (ev) => {
        return ev.account === Deployer;
    })
    
    assert.isFalse(await supplyChain.amIRegulator.call({from: Deployer}))     
});


it("ACCESS: Manufacturer Role: any user can assign this role,`ManufacturerAdded` emitted, `assignMeAsManufacturer()`", async() => {
    let tx = await supplyChain.assignMeAsManufacturer({from: Manufacturer})
    truffleAssert.eventEmitted(tx, 'ManufacturerAdded', (ev) => {
        return ev.account === Manufacturer;
    })
    
    assert.isTrue(await supplyChain.amIManufacturer.call({from: Manufacturer}))     
});
it("ACCESS: Manufacturer Role: user can renounce this role,`ManufacturerRemoved` emitted, `renounceMeFromManufacturer()`", async() => {
    let tx = await supplyChain.renounceMeFromManufacturer({from: Deployer})
    truffleAssert.eventEmitted(tx, 'ManufacturerRemoved', (ev) => {
        return ev.account === Deployer;
    })
    
    assert.isFalse(await supplyChain.amIManufacturer.call({from: Deployer}))     
});


it("ACCESS: Distributor Role: any user can assign this role,`DistributorAdded` emitted, `assignMeAsDistributor()`", async() => {
    let tx = await supplyChain.assignMeAsDistributor({from: Distributor})
    truffleAssert.eventEmitted(tx, 'DistributorAdded', (ev) => {
        return ev.account === Distributor;
    })
    
    assert.isTrue(await supplyChain.amIDistributor.call({from: Distributor}))     
});
it("ACCESS: Distributor Role: user can renounce this role,`DistributorRemoved` emitted, `renounceMeFromDistributor()`", async() => {
    let tx = await supplyChain.renounceMeFromDistributor({from: Deployer})
    truffleAssert.eventEmitted(tx, 'DistributorRemoved', (ev) => {
        return ev.account === Deployer;
    })
    
    assert.isFalse(await supplyChain.amIDistributor.call({from: Deployer}))     
});


it("ACCESS: Retailer Role: any user can assign this role,`RetailerAdded` emitted, `assignMeAsRetailer()`", async() => {
    let tx = await supplyChain.assignMeAsRetailer({from: Retailer})
    truffleAssert.eventEmitted(tx, 'RetailerAdded', (ev) => {
        return ev.account === Retailer;
    })
    
    assert.isTrue(await supplyChain.amIRetailer.call({from: Retailer}))     
});
it("ACCESS: Retailer Role: user can renounce this role,`RetailerRemoved` emitted, `renounceMeFromRetailer()`", async() => {
    let tx = await supplyChain.renounceMeFromRetailer({from: Deployer})
    truffleAssert.eventEmitted(tx, 'RetailerRemoved', (ev) => {
        return ev.account === Deployer;
    })
    
    assert.isFalse(await supplyChain.amIRetailer.call({from: Deployer}))     
});


it("ACCESS: Consumer Role: any user can assign this role,`ConsumerAdded` emitted, `assignMeAsConsumer()`", async() => {
    let tx = await supplyChain.assignMeAsConsumer({from: Consumer})
    truffleAssert.eventEmitted(tx, 'ConsumerAdded', (ev) => {
        return ev.account === Consumer;
    })
    
    assert.isTrue(await supplyChain.amIConsumer.call({from: Consumer}))     
});
it("ACCESS: Consumer Role: user can renounce this role,`ConsumerRemoved` emitted, `renounceMeFromConsumer()`", async() => {
    let tx = await supplyChain.renounceMeFromConsumer({from: Deployer})
    truffleAssert.eventEmitted(tx, 'ConsumerRemoved', (ev) => {
        return ev.account === Deployer;
    })
    
    assert.isFalse(await supplyChain.amIConsumer.call({from: Deployer}))     
});


});
