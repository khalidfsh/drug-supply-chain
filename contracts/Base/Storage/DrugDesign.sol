pragma solidity ^0.5.0;

/// Import Partnerships library
import "../../utils/Partnerships.sol";


/// @author Khalid F.Sh
/// @title Drug Design Chain Contract
contract DrugDesign {
    using Partnerships for Partnerships.Partnership;
    
    /// Variable for tracking Universal Drug Product Code (UDPC)
    uint udpc;

    /// Public mapping from UDPC to a Drug Design Item
    mapping (uint => DrugDesignItem) dDItems;

    /// Enumaration for defining variety of Drug Design State
    enum DrugDesignState {
        Owned,             
        Tested,
        Approved,
        ForSale
    }

    /// Structure keeping meta data for a Drug Design **TODO**
    struct DrugDesignMeta {
        string name;
        string description;
        string notes;
    }

    /// Structure for Drug Design Test Case **TODO**
    struct DrugDesignTestCase {
        address testerId;
        uint timeStamp;
        bool isPassed;
        string description;
        string notes;
    }

    /// Structure for keeping Drug Design fields structured
    struct DrugDesignItem {
        uint udpc;
        address payable owner;
        string designerName;
        DrugDesignState state;
        DrugDesignMeta metaData;
        uint salePrice;
        uint testIndexed;
        mapping(uint => DrugDesignTestCase) testCases;
        Partnerships.Partnership manufacturers;
    }

    /// Event to emit them for users in functions, accept `udpc` as input
    event Owned(uint udpc);
    event TestCaseAdded(uint udpc);
    event Approved(uint udpc);
    event UpForSale(uint updc);
    event DrugDesignPurchased(uint udpc);
    event SaleCanceled(uint updc);
    event UpForPartnered(uint updc);
    event UpForRestrictPartnered(uint updc);
    event PartnerGained(uint udpc);
    event RestrictPartnerTransfered(uint udpc, address partner);
    event PartnerClosed(uint udpc);

    /// Modifier that checks the paid enough as expected and refunds the remaining balance
    modifier checkDrugDesignPaymentValue(uint _udpc) {
        require(msg.value >= dDItems[_udpc].salePrice, "Not Enough!");
        _;
        uint _price = dDItems[_udpc].salePrice;
        uint amountToReturn = msg.value - _price;
        if (amountToReturn != 0) 
            address(msg.sender).transfer(amountToReturn);
    }

    /// Modifier that checks if an DrugDesignItem.state of a udpc is Owned
    modifier isOwned(uint _udpc) {
        require(dDItems[_udpc].state == DrugDesignState.Owned);
        _;
    }

    /// Modifier that checks if an DrugDesignItem.state of a udpc is Tested
    modifier isTested(uint _udpc) {
        require(dDItems[_udpc].state == DrugDesignState.Tested);
        _;
    }
    
    /// Modifier that checks if an DrugDesignItem.state of a udpc is Approved
    modifier isApproved(uint _udpc) {
        require(dDItems[_udpc].state == DrugDesignState.Approved);
        _;
    }

    /// Modifier that checks if the caller he is the owner of Drug Design
    modifier onlyOwnerOf(uint _udpc) {
        require(dDItems[_udpc].owner == msg.sender);
        _;
    }

    /// Modifier that checks if the caller he is the owner of Drug Design
    modifier drugDesignForSale(uint _udpc) {
        require(dDItems[_udpc].state == DrugDesignState.ForSale);
        _;
    }
    
    /// Modifier that checks if an DrugDesignItem.manufacturers.state of a udpc is Opened
    modifier isPartnerOpened(uint _udpc) {
        require(dDItems[_udpc].manufacturers.state == Partnerships.PartnershipState.Opened);
        _;
    }

    /// Modifier that checks if an DrugDesignItem.manufacturers.state of a udpc is Restricted
    modifier isPartnerRestricted(uint _udpc) {
        require(dDItems[_udpc].manufacturers.state == Partnerships.PartnershipState.Restricted);
        _;
    }

    /// Modifier that checks if an DrugDesignItem.manufacturers.state of a udpc is Closed
    modifier onlyManufacturPartnerOf(uint _udpc) {
        require(dDItems[_udpc].manufacturers.has(msg.sender));
        _;
    }


}
