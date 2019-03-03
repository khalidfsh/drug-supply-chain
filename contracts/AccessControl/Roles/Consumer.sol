pragma solidity ^0.5.0;

/// Import the 'Roles' library from OpenZeppelin contracts package
import "openzeppelin-solidity/contracts/access/Roles.sol";


/// @author Khalid F.Sh
/// @title A Consumer Role Contract
/// @dev contract for adding, removing and checking an address in the container '_consumers' Role.
/// @notice functionalty in this contract are internal to be managed in './Rolable.sol' contract.
contract Consumer {

    /// using Role struct from 'Roles' library
    using Roles for Roles.Role;

    /// 2 events, one for Adding, and other for Removing
    event ConsumerAdded(address indexed account);
    event ConsumerRemoved(address indexed account);

    /// structure '_consumers' inherited from 'Roles' library
    Roles.Role private _consumers;

    /// @notice constructer will assign the deployer as 1st consumer
    constructor () internal {
        _addConsumer(msg.sender);
    }

    // modifier that checks to see if `msg.sender` has consumer role
    modifier onlyConsumer() {
        require(isConsumer(msg.sender));
        _;
    }

    /// Function to check even he has consumer role or not
    /// @param account address to be checked
    /// @return boolean for this address state in `_consumers` Role
    /// @notice uses'Roles' library's internal function `has()` to check, refer to library for more detail
    function isConsumer(address account) public view returns (bool) {
        return _consumers.has(account);
    }

    /// Function to check caller `msg.sender` if he has consumer role
    /// @return boolean for caller address state in `_consumers` Role
    function amIConsumer() public view returns (bool) {
        return _consumers.has(msg.sender);
    }

    /// Function to assign caller `msg.sender` to consumer role
    function assignMeAsConsumer() public {
        _addConsumer(msg.sender);
    }

    /// Function to renounce caller `msg.sender` from consumer role
    function renounceMeFromConsumer() public {
        _removeConsumer(msg.sender);
    }

    /// Internal function to add account to this role
    /// @param account address to be Added
    /// @notice uses'Roles' library's internal function `add()`, refer to the library for more detail
    function _addConsumer(address account) internal {
        _consumers.add(account);
        emit ConsumerAdded(account);
    }

    /// Internal function to remove account from this role
    /// @param account address to be removed
    /// @notice uses'Roles' library's internal function `remove()`, refer to the library for more detail
    function _removeConsumer(address account) internal {
        _consumers.remove(account);
        emit ConsumerRemoved(account);
    }
}