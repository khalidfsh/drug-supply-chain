pragma solidity ^0.5.0;

/// Import the 'Roles' library from OpenZeppelin contracts package
import "openzeppelin-solidity/contracts/access/Roles.sol";


/// @author Khalid F.Sh
/// @title A Retailer Role Contract
/// @dev contract for adding, removing and checking an address in the container '_retailers' Role.
/// @notice functionalty in this contract are internal to be managed in './Rolable.sol' contract.
contract Retailer {

    /// using Role struct from 'Roles' library
    using Roles for Roles.Role;

    /// 2 events, one for Adding, and other for Removing
    event RetailerAdded(address indexed account);
    event RetailerRemoved(address indexed account);

    /// structure '_retailers' inherited from 'Roles' library
    Roles.Role private _retailers;

    /// @notice constructer will assign the deployer as 1st retailer
    constructor () internal {
        _addRetailer(msg.sender);
    }

    /// modifier that checks to see if `msg.sender` has retailer role
    modifier onlyRetailer() {
        require(isRetailer(msg.sender));
        _;
    }

    /// Function to check even he has retailer role or not
    /// @param account address to be checked
    /// @return boolean for this address state in `_retailers` Role
    /// @notice uses'Roles' library's internal function `has()` to check, refer to library for more detail
    function isRetailer(address account) public view returns (bool) {
        return _retailers.has(account);
    }

    /// Function to check caller `msg.sender` if he has retailer role
    /// @return boolean for caller address state in `_retailers` Role
    function amIRetailer() public view returns (bool) {
        return _retailers.has(msg.sender);
    }

    /// Function to assign caller `msg.sender` to retailer role
    function assignMeAsRetailer() public {
        _addRetailer(msg.sender);
    }

    /// Function to renounce caller `msg.sender` from retailer role
    function renounceMeFromRetailer() public {
        _removeRetailer(msg.sender);
    }

    /// Internal function to add account to this role
    /// @param account address to be Added
    /// @notice uses'Roles' library's internal function `add()`, refer to the library for more detail
    function _addRetailer(address account) internal {
        _retailers.add(account);
        emit RetailerAdded(account);
    }

    /// Internal function to remove account from this role
    /// @param account address to be removed
    /// @notice uses'Roles' library's internal function `remove()`, refer to the library for more detail
    function _removeRetailer(address account) internal {
        _retailers.remove(account);
        emit RetailerRemoved(account);
    }
}