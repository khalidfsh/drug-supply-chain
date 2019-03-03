pragma solidity ^0.5.0;

/// Import all Roles
import "./Roles/Consumer.sol";
import "./Roles/Designer.sol";
import "./Roles/Distributor.sol";
import "./Roles/Manufacturer.sol";
import "./Roles/Regulator.sol";
import "./Roles/Retailer.sol";


/// @author Khalid F.Sh
/// @title Role Ability Contract
/// @dev contract for adopting all roles in access control
contract Rolable is Consumer, Designer, Distributor, Regulator, Retailer {

    /// Function to check all roles for the caller
    /// @return array contining every role with its state as boolean
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

