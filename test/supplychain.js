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








/// BASE Tests:
it("BASE: DrugDesign: Designer can add new DrugDesign and event `Owned` emitted, `designDrug()`", async() => {
    let tx = await supplyChain.designDrug(
        DrugDesign1.designerName, 
        DrugDesign1.name, 
        DrugDesign1.description, 
        DrugDesign1.notes, 
        {from: Designer}
    )

    truffleAssert.eventEmitted(tx, 'Owned', (ev) => {
        return ev.udpc == DrugDesign1.udpc;
    })

    let DrugDesignData = await supplyChain.fetchDrugDesignData.call(DrugDesign1.udpc);
    let DrugDesignMetaData = await supplyChain.featchDrugDesignMetaData.call(DrugDesign1.udpc);

    assert.equal(DrugDesignData.designerId, Designer)
    assert.equal(DrugDesignData.designerName, DrugDesign1.designerName)
    assert.equal(DrugDesignData.drugName, DrugDesign1.name)
    assert.equal(DrugDesignMetaData.description, DrugDesign1.description)
    assert.equal(DrugDesignMetaData.notes, DrugDesign1.notes)
});

it("BASE: DrugDesign: Another Roles cannot add new DrugDesign,`onlyDesigner()` `designDrug()`", async() => {

    await truffleAssert.reverts(
        supplyChain.designDrug(
            DrugDesign2.designerName, 
            DrugDesign2.name, 
            DrugDesign2.description, 
            DrugDesign2.notes, 
            {from: Deployer}
        ),
        'Not A Designer!'
    )

    await truffleAssert.reverts(
        supplyChain.fetchDrugDesignData.call(DrugDesign2.udpc),
        'Given UDPC Not Created Yet!'
    )
});

/// BASE Tests:
it("BASE: DrugDesign: Designer can add test case event `TestCaseAdded` emitted, `addTestCase()`", async() => {
    let tx = await supplyChain.addTestCase(
        DrugDesign1.udpc, 
        TestCase1.description, 
        TestCase1.isPassed,
        TestCase1.notes, 
        {from: Designer}
    )

    truffleAssert.eventEmitted(tx, 'TestCaseAdded', (ev) => {
        return ev.udpc == DrugDesign1.udpc;
    })

    let DrugDesignTestCase = await supplyChain.featchDrugDesignTestCases.call(DrugDesign1.udpc, 0);


    assert.equal(DrugDesignTestCase.description, TestCase1.description)
    assert.equal(DrugDesignTestCase.isPassed, TestCase1.isPassed)
    assert.equal(DrugDesignTestCase.notes, TestCase1.notes)
});

it("BASE: DrugDesign: Regulator can add test case event `TestCaseAdded` emitted, `addTestCase()`", async() => {
    let tx = await supplyChain.addTestCaseByRegulaor(
        DrugDesign1.udpc, 
        TestCase2.description, 
        TestCase2.isPassed,
        TestCase2.notes, 
        {from: Regulator}
    )

    truffleAssert.eventEmitted(tx, 'TestCaseAdded', (ev) => {
        return ev.udpc == DrugDesign1.udpc;
    })

    let DrugDesignTestCase = await supplyChain.featchDrugDesignTestCases.call(DrugDesign1.udpc, 1);


    assert.equal(DrugDesignTestCase.description, TestCase2.description)
    assert.equal(DrugDesignTestCase.isPassed, TestCase2.isPassed)
    assert.equal(DrugDesignTestCase.notes, TestCase2.notes)
});

it("BASE: DrugDesign: Regulator approve drug, event `Approved` emitted, `approveDrug()`", async() => {
    let tx = await supplyChain.approveDrug(
        DrugDesign1.udpc, 
        {from: Regulator}
    )
    truffleAssert.eventEmitted(tx, 'Approved', (ev) => {
        return ev.udpc == DrugDesign1.udpc;
    })
});

it("BASE: DrugDesign: Designer can put drug for sale, event `UpForSale` emitted, `upForSale()`", async() => {
    
    let tx = await supplyChain.upForSale(
        DrugDesign1.udpc,
        DrugDesign1.salePrice,
        {from: Designer}
    )
    truffleAssert.eventEmitted(tx, 'UpForSale', (ev) => {
        assert.equal(ev.udpc, DrugDesign1.udpc)
        return true
    })

    let DrugDesignData = await supplyChain.fetchDrugDesignData.call(DrugDesign1.udpc);
    assert.equal(DrugDesignData.salePrice, DrugDesign1.salePrice)
});

it("BASE: DrugDesign: Manufacturer can buy drug design, event `DrugDesignPurchased` emitted, `purchaseDrugDesign()`", async() => {
    await supplyChain.assignMeAsManufacturer({from: Manufacturer_Owner})
    
    let tx = await supplyChain.purchaseDrugDesign(
        DrugDesign1.udpc,
        {from: Manufacturer_Owner, value: DrugDesign1.salePrice}
    )
    truffleAssert.eventEmitted(tx, 'DrugDesignPurchased', (ev) => {
        assert.equal(ev.udpc, DrugDesign1.udpc)
        return true
    })

    let DrugDesignData = await supplyChain.fetchDrugDesignData.call(DrugDesign1.udpc);
    assert.equal(DrugDesignData.currentOwner, Manufacturer_Owner)
});

it("BASE: DrugDesign: Owner of drug design can open acception of partner, event `UpForPartnered` emitted, `openManufactPartnership()`", async() => {
    
    let tx = await supplyChain.openManufactPartnership(
        DrugDesign1.udpc,
        DrugDesign1.partnerShares,
        {from: Manufacturer_Owner}
    )
    truffleAssert.eventEmitted(tx, 'UpForPartnered', (ev) => {
        assert.equal(ev.udpc, DrugDesign1.udpc)
        return true
    })

    let DrugDesignData = await supplyChain.fetchDrugDesignData.call(DrugDesign1.udpc);
    assert.equal(DrugDesignData.partnershipState, 'Open')
    assert.equal(DrugDesignData.partnershipShares, DrugDesign1.partnerShares)
});

it("BASE: DrugDesign: Manufacturer can build partner contract of drug design , event `PartnerGained` emitted, `buildPartnerContract()`", async() => {
    await supplyChain.assignMeAsManufacturer({from: Manufacturer_Partner})

    let tx = await supplyChain.buildPartnerContract(
        DrugDesign1.udpc,
        'PartnerA',
        {from: Manufacturer_Partner}
    )
    truffleAssert.eventEmitted(tx, 'PartnerGained', (ev) => {
        assert.equal(ev.udpc, DrugDesign1.udpc)
        return true
    })

    let DrugDesignData = await supplyChain.fetchDrugDesignData.call(DrugDesign1.udpc);
    assert.equal(DrugDesignData.numberOfManufacturers, 1)

    let isManufacturerOf =  await supplyChain.isManufacturerOf.call(DrugDesign1.udpc, Manufacturer_Partner)
    assert.isTrue(isManufacturerOf)

    let manufacturerShares = await supplyChain.manufacturerSharesOf.call(DrugDesign1.udpc, Manufacturer_Partner)
    assert.equal(manufacturerShares, DrugDesign1.partnerShares)

});

it("BASE: DrugDesign: Owner of drug design can close acception of partner, event `PartnerClosed` emitted, `closeManufactPartnership()`", async() => {
    
    let tx = await supplyChain.closeManufactPartnership(
        DrugDesign1.udpc,
        {from: Manufacturer_Owner}
    )
    truffleAssert.eventEmitted(tx, 'PartnerClosed', (ev) => {
        assert.equal(ev.udpc, DrugDesign1.udpc)
        return true
    })

    let DrugDesignData = await supplyChain.fetchDrugDesignData.call(DrugDesign1.udpc);
    assert.equal(DrugDesignData.partnershipState, 'Close')
    assert.equal(DrugDesignData.partnershipShares, 0)

});

it("BASE: DrugDesign: Owner of drug design can restrict acception of partner, event `UpForRestrictPartnered` emitted, `restrictManufactPartnership()`", async() => {
    
    let tx = await supplyChain.restrictManufactPartnership(
        DrugDesign1.udpc,
        {from: Manufacturer_Owner}
    )
    truffleAssert.eventEmitted(tx, 'UpForRestrictPartnered', (ev) => {
        assert.equal(ev.udpc, DrugDesign1.udpc)
        return true
    })

    let DrugDesignData = await supplyChain.fetchDrugDesignData.call(DrugDesign1.udpc);
    assert.equal(DrugDesignData.partnershipState, 'Restrict')
});

it("BASE: DrugDesign: Only owner of drug design can build partner contract of drug design , event `RestrictPartnerTransfered` emitted, `buildRestrictPartnerContract()`", async() => {
    
    let tx = await supplyChain.buildRestrictPartnerContract(
        DrugDesign1.udpc,
        Manufacturer,
        'PartnerB',
        DrugDesign1.restrictedShares,
        {from: Manufacturer_Owner}
    )

    truffleAssert.eventEmitted(tx, 'RestrictPartnerTransfered', (ev) => {
        assert.equal(ev.udpc, DrugDesign1.udpc)
        return true
    })

    let DrugDesignData = await supplyChain.fetchDrugDesignData.call(DrugDesign1.udpc);
    assert.equal(DrugDesignData.numberOfManufacturers, 2)

    let isManufacturerOf =  await supplyChain.isManufacturerOf.call(DrugDesign1.udpc, Manufacturer)
    assert.isTrue(isManufacturerOf)

    let manufacturerShares = await supplyChain.manufacturerSharesOf.call(DrugDesign1.udpc, Manufacturer)
    assert.equal(manufacturerShares, DrugDesign1.restrictedShares)

});


});
