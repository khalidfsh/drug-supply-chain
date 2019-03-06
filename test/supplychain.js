const MainChain = artifacts.require('./Core/MainChain.sol')
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract('Supplychain Contracts:', async (accounts) => {
    let supplyChain
    const deployer = accounts[0]
    const designer = accounts[1]
    const regulator = accounts[2]
    const manufacturer = accounts[3]
    const distributor = accounts[4]
    const retailer = accounts[5]
    const consumer = accounts[6]
    const emptyAddress = '0x00000000000000000000000000000000000000'
    
    beforeEach('setup contract:', async () => {
        supplyChain = await MainChain.deployed();
    });

    // afterEach(async () => {
    //     await supplyChain.kill({from: deployer});
    // });

    it("ACCESS: Deployer gets all roles", async() => {
        let rollsChecker = await supplyChain.whoAmI.call({from: deployer})
        for (var key in rollsChecker) {
            assert.isTrue(rollsChecker[key])
        }
    });

    it("ACCESS: DesignerRole: User can assign, renounce and event `DesignerAdded` & `DesignerRemoved` emitted", async() => {
        let txa = await supplyChain.assignMeAsDesigner({from: designer})
        truffleAssert.eventEmitted(txa, 'DesignerAdded', (ev) => {
            return ev.account === designer;
        })
        let txr = await supplyChain.renounceMeFromDesigner({from: designer})
        truffleAssert.eventEmitted(txr, 'DesignerRemoved', (ev) => {
            return ev.account === designer;
        })
        await supplyChain.assignMeAsDesigner({from: designer})
        let amIDesigner = await supplyChain.amIDesigner.call({from: designer})
        assert.isTrue(amIDesigner)     
    });

    it("ACCESS: RegulatorRole: User can renounce, another regulatur can add, event `RegulatorAdded`&`RegulatorRemoved` emitted", async() => {
        await truffleAssert.reverts(
            supplyChain.addRegulator(regulator, {from: regulator}),
            "You Don't have Premetion!"
        )
        assert.isFalse(await supplyChain.amIRegulator.call({from: regulator}))
        
        let txa = await supplyChain.addRegulator(regulator, {from: deployer})
        truffleAssert.eventEmitted(txa, 'RegulatorAdded', (ev) => {
            return ev.account === regulator;
        });

        let txr = await supplyChain.renounceMeFromRegulator({from: regulator})
        truffleAssert.eventEmitted(txr, 'RegulatorRemoved', (ev) => {
            return ev.account === regulator;
        });

        await supplyChain.addRegulator(regulator, {from: deployer})
        amIRegulator = await supplyChain.amIRegulator.call({from: regulator})
        assert.isTrue(amIRegulator)
    });

    it("ACCESS: ManufacturerRole: User can assign, renounce and event `ManufacturerAdded` & `ManufacturerRemoved` emitted", async() => {
        let txa = await supplyChain.assignMeAsManufacturer({from: manufacturer})
        truffleAssert.eventEmitted(txa, 'ManufacturerAdded', (ev) => {
            return ev.account === manufacturer;
        })
        let txr = await supplyChain.renounceMeFromManufacturer({from: manufacturer})
        truffleAssert.eventEmitted(txr, 'ManufacturerRemoved', (ev) => {
            return ev.account === manufacturer;
        })
        await supplyChain.assignMeAsManufacturer({from: manufacturer})
        let amIManufacturer = await supplyChain.amIManufacturer.call({from: manufacturer})
        assert.isTrue(amIManufacturer)     
    });

    it("ACCESS: DistributorRole: User can assign, renounce and event `DistributorAdded` & `DistributorRemoved` emitted", async() => {
        let txa = await supplyChain.assignMeAsDistributor({from: distributor})
        truffleAssert.eventEmitted(txa, 'DistributorAdded', (ev) => {
            return ev.account === distributor;
        })
        let txr = await supplyChain.renounceMeFromDistributor({from: distributor})
        truffleAssert.eventEmitted(txr, 'DistributorRemoved', (ev) => {
            return ev.account === distributor;
        })
        await supplyChain.assignMeAsDistributor({from: distributor})
        let amIDistributor = await supplyChain.amIDistributor.call({from: distributor})
        assert.isTrue(amIDistributor)     
    });

    it("ACCESS: RetailerRole: User can assign, renounce and event `RetailerAdded` & `RetailerRemoved` emitted", async() => {
        let txa = await supplyChain.assignMeAsRetailer({from: retailer})
        truffleAssert.eventEmitted(txa, 'RetailerAdded', (ev) => {
            return ev.account === retailer;
        })
        let txr = await supplyChain.renounceMeFromRetailer({from: retailer})
        truffleAssert.eventEmitted(txr, 'RetailerRemoved', (ev) => {
            return ev.account === retailer;
        })
        await supplyChain.assignMeAsRetailer({from: retailer})
        let amIRetailer = await supplyChain.amIRetailer.call({from: retailer})
        assert.isTrue(amIRetailer)     
    });

    it("ACCESS: ConsumerRole: User can assign, renounce and event `ConsumerAdded` & `ConsumerRemoved` emitted", async() => {
        let txa = await supplyChain.assignMeAsConsumer({from: consumer})
        truffleAssert.eventEmitted(txa, 'ConsumerAdded', (ev) => {
            return ev.account === consumer;
        })
        let txr = await supplyChain.renounceMeFromConsumer({from: consumer})
        truffleAssert.eventEmitted(txr, 'ConsumerRemoved', (ev) => {
            return ev.account === consumer;
        })
        await supplyChain.assignMeAsConsumer({from: consumer})
        let amIConsumer = await supplyChain.amIConsumer.call({from: consumer})
        assert.isTrue(amIConsumer)     
    });

    it("STORAGE: DrugDesign: Designer only can add new DrugDesign and event `Owned` emitted", async() => {
        
    });

});
