pragma solidity ^0.5.0;

/// Import main chains contracts
import "./Storage/Drug.sol";
import "./Storage/DrugDesign.sol";

/// Import Main Roles contract `Rolable.sol`
import "../AccessControl/Rolable.sol";

/// Import Pausable contract from OpenZeppelin library
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";


/// @author Khalid F.Sh
/// @title Supply Chain Contract
contract SupplyChain is Rolable, Pausable, DrugDesign, Drug {

    constructor() public {

    }

    /// Function helps Designer to estaplish a new Drug Design
    function designDrug(
        string memory _designerName,
        string memory _drugName,
        string memory _description,
        string memory _notes
    )
        public
        onlyDesigner()
        whenNotPaused()
    {
        super.designDrug(
            _designerName,
            _drugName,
            _description,
            _notes
        );
    }

    // Add Test Case for Drug Design by regulator
    function addTestCaseByRegulaor(
        uint _udpc,
        string memory _description,
        bool _isPassed,
        string memory _notes
    )
        public
        onlyRegulator()
    {
        super.addTestCaseByRegulaor(
            _udpc,
            _description,
            _isPassed,
            _notes
        );
    }

    // Function to approve drug by a regulator only
    function approveDrug(uint _udpc)
        public
        onlyRegulator()
        whenNotPaused()
    {
        super.approveDrug(_udpc);
    }

    /// Function to purchase a drug design
    function purchaseDrugDesign(uint _udpc)
        public
        payable
        onlyManufacturer()
    {
        super.purchaseDrugDesign(_udpc);
    }

    /// Function to build a manufacturer partner contract
    function buildPartnerContract(uint _udpc, string memory _name)
        public
        onlyManufacturer()
        whenNotPaused()
    {
        super.buildPartnerContract(_udpc, _name);
    }

    /// Function helps manufacturer to manufactur a new Drug Loud
    function manufacturDrugsLoud(uint _udpc, uint quantity)
        public
        onlyManufacturer()
        onlyManufacturPartnerOf(_udpc)
    {
        super.manufacturDrugsLoud(_udpc, quantity);
    }

    /// Function helps distributor to buy a Drug Loud
    /// it can be quantity only order but i think its not important for now
    function buyDrugsLoud(uint _slu, address _receiver)
        public
        payable
        onlyDistributor()
        whenNotPaused()
    {
        /// reciever most be reteiler
        require(isRetailer(_receiver));
        /// collect info about the whole proccess
        DrugItem memory sampleUnit = dItems[stockLouds[_slu][0]];
        uint _udpc = sampleUnit.udpc;
        uint price = sampleUnit.price;
        uint quantity = stockLouds[_slu].length;
        uint totalPrice = price*quantity;
        
        ///colect shared worker addresses to payed them
        address payable sallerId = address(sampleUnit.currentOwnerId);

        require(msg.value >= totalPrice, "Not Enough!");
        uint amountToReturn = msg.value - totalPrice;
        if (amountToReturn != 0)
            address(msg.sender).transfer(amountToReturn);

        super.buyDrugsLoud(_slu, _receiver);
        
        if (sallerId == dDItems[_udpc].currentOwner){
            sallerId.transfer(totalPrice);
        }
        else {
            uint shareOfSallerPresntage = dDItems[_udpc].manufacturers.sharesOf(sallerId);
            uint shareOfSaller = (shareOfSallerPresntage*totalPrice)/100;
            address payable orignalSallerId = dDItems[_udpc].manufacturers.owner;
            sallerId.transfer(shareOfSaller);
            orignalSallerId.transfer(totalPrice - shareOfSaller);
        }
        
    }

    /// Function helps manufacturer to Pack a isManufactured Drug Loud
    function purchaseDrug (uint _pku)
        public
        payable
        onlyConsumer()
        whenNotPaused()
    {
        uint price = dItems[_pku].price;
        address payable sallerId = dItems[_pku].currentOwnerId;

        address payable retailerId = address(uint160(dItems[_pku].retailerId));
        uint retialerBounty = (price*5) /100;
        uint developerBounty = (price*1) /100; 

        require(msg.value >= price, "Not Enough!");
        uint amountToReturn = msg.value - price;
        if (amountToReturn != 0)
            address(msg.sender).transfer(amountToReturn);

        super.purchaseDrug(_pku);

        sallerId.transfer(price - (retialerBounty + developerBounty));
        retailerId.transfer(retialerBounty);
    }

}
