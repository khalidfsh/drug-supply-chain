pragma solidity ^0.5.0;


/// @author Khalid F.Sh
/// @title Drug Design Chain Contract
contract DrugDesign {
    
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
    }
}
