pragma solidity ^0.5.0;

/// Import the 'Roles' library from OpenZeppelin contracts package
import "openzeppelin-solidity/contracts/access/Roles.sol";


/// @author Khalid F.Sh
/// @title A Manufacturer Role Contract
/// @dev contract for adding, removing and checking an address in the container '_manufacturers' Role.
/// @notice functionalty in this contract are internal to be managed in './Rolable.sol' contract.
contract Manufacturer {

    /// using Role struct from 'Roles' library
    using Roles for Roles.Role;

    /// 2 events, one for Adding, and other for Removing
    event ManufacturerAdded(address indexed account);
    event ManufacturerRemoved(address indexed account);

    /// structure '_manufacturers' inherited from 'Roles' library
    Roles.Role private _manufacturers;

    /// @notice constructer will assign the deployer as 1st manufacturer
    constructor () internal {
        _addManufacturer(msg.sender);
    }

    /// modifier that checks to see if `msg.sender` has manufacturer role
    modifier onlyManufacturer() {
        require(isManufacturer(msg.sender), 'Not A Manufacturer!');
        _;
    }

    /// Function to check even he has manufacturer role or not
    /// @param account address to be checked
    /// @return boolean for this address state in `_manufacturers` Role
    /// @notice uses'Roles' library's internal function `has()` to check, refer to library for more detail
    function isManufacturer(address account) public view returns (bool) {
        return _manufacturers.has(account);
    }

    /// Function to check caller `msg.sender` if he has manufacturer role
    /// @return boolean for caller address state in `_manufacturers` Role
    function amIManufacturer() public view returns (bool) {
        return _manufacturers.has(msg.sender);
    }

    /// Function to assign caller `msg.sender` to manufacturer role
    function assignMeAsManufacturer() public {
        _addManufacturer(msg.sender);
    }

    /// Function to renounce caller `msg.sender` from manufacturer role
    function renounceMeFromManufacturer() public {
        _removeManufacturer(msg.sender);
    }

    /// Internal function to add account to this role
    /// @param account address to be Added
    /// @notice uses'Roles' library's internal function `add()`, refer to the library for more detail
    function _addManufacturer(address account) internal {
        _manufacturers.add(account);
        emit ManufacturerAdded(account);
    }

    /// Internal function to remove account from this role
    /// @param account address to be removed
    /// @notice uses'Roles' library's internal function `remove()`, refer to the library for more detail
    function _removeManufacturer(address account) internal {
        _manufacturers.remove(account);
        emit ManufacturerRemoved(account);
    }
}
