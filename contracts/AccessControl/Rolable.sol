pragma solidity ^0.5.0;

import "./Roles/Consumer.sol";
import "./Roles/Designer.sol";
import "./Roles/Distributor.sol";
import "./Roles/Manufacturer.sol";
import "./Roles/Regulator.sol";
import "./Roles/Retailer.sol";

contract Rolable is Consumer, Designer, Distributor, Regulator, Retailer {
    
    constructor () public {

    }

    function whoAmI() public view returns(
        bool consumer, 
        bool retailer, 
        bool distributor, 
        bool manufacturer,
        bool regulator,
        bool designer
    )
    {
        consumer = amIConsumer();
        retailer = amIRetailer();
        distributor = amIDistributor();
        manufacturer = amIManufacturer();
        regulator = amIRegulator();
        designer = amIDesigner();
    }
}

