pragma solidity ^0.5.0;

/// Import the 'Roles' library from OpenZeppelin contracts package
import "openzeppelin-solidity/contracts/access/Roles.sol";

/// Import `Manafacturer` Role contract
import "./Manufacturer.sol";


/// @author Khalid F.Sh
/// @title A Designer Role Contract
/// @dev contract for adding, removing and checking an address in the container '_designers' Role
/// @notice inherite `Manufacturer` role to give all manufacturer functionalty to designer role
contract Designer is Manufacturer {

    /// using Role struct from 'Roles' library
    using Roles for Roles.Role;

    /// 2 events, one for Adding, and other for Removing
    event DesignerAdded(address indexed account);
    event DesignerRemoved(address indexed account);

    /// structure '_designers' inherited from 'Roles' library
    Roles.Role private _designers;

    /// @notice constructer will assign the deployer as 1st designer
    constructor () internal {
        _addDesigner(msg.sender);
    }

    /// modifier that checks to see if `msg.sender` has designer role
    modifier onlyDesigner() {
        require(isDesigner(msg.sender));
        _;
    }

    /// Function to check even he has designer role or not
    /// @param account address to be checked
    /// @return boolean for this address state in `_designers` Role
    /// @notice uses'Roles' library's internal function `has()` to check, refer to library for more detail
    function isDesigner(address account) public view returns (bool) {
        return _designers.has(account);
    }

    /// Function to check caller `msg.sender` if he has designer role
    /// @return boolean for caller address state in `_designers` Role
    function amIDesigner() public view returns (bool) {
        return _designers.has(msg.sender);
    }

    /// Function to assign caller `msg.sender` to designer role
    ///@notice designer allways should be a menufacturer, after checking isManufacturer add it if not
    function assignMeAsDesigner() public {
        _addDesigner(msg.sender);
        if (!isManufacturer(msg.sender))
            _addManufacturer(msg.sender);
    }

    /// Function to renounce caller `msg.sender` from designer role
    function renounceMeFromDesiner() public {
        _removeDesigner(msg.sender);
    }

    /// Internal function to add account to this role
    /// @param account address to be Added
    /// @notice uses'Roles' library's internal function `add()`, refer to the library for more detail
    function _addDesigner(address account) internal {
        _designers.add(account);
        emit DesignerAdded(account);
    }

    /// Internal function to remove account from this role
    /// @param account address to be removed
    /// @notice uses'Roles' library's internal function `remove()`, refer to the library for more detail
    function _removeDesigner(address account) internal {
        _designers.remove(account);
        emit DesignerRemoved(account);
    }
}
