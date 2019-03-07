pragma solidity ^0.5.0;

/// Import the 'Roles' library from OpenZeppelin contracts package
import "openzeppelin-solidity/contracts/access/Roles.sol";


/// @author Khalid F.Sh
/// @title A Distributor Role Contract
/// @dev contract for adding, removing and checking an address in the container '_distributors' Role.
/// @notice functionalty in this contract are internal to be managed in './Rolable.sol' contract.
contract Distributor {

    /// using Role struct from 'Roles' library
    using Roles for Roles.Role;

    /// 2 events, one for Adding, and other for Removing
    event DistributorAdded(address indexed account);
    event DistributorRemoved(address indexed account);

    /// structure '_distributors' inherited from 'Roles' library
    Roles.Role private _distributors;

    /// @notice constructer will assign the deployer as 1st distributor
    constructor () internal {
        _addDistributor(msg.sender);
    }

    // modifier that checks to see if `msg.sender` has distributor role
    modifier onlyDistributor() {
        require(isDistributor(msg.sender), 'Not A Distributor!');
        _;
    }

    /// Function to check even he has distributor role or not
    /// @param account address to be checked
    /// @return boolean for this address state in `_distributors` Role
    /// @notice uses'Roles' library's internal function `has()` to check, refer to library for more detail
    function isDistributor(address account) public view returns (bool) {
        return _distributors.has(account);
    }

    /// Function to check caller `msg.sender` if he has distributor role
    /// @return boolean for caller address state in `_distributors` Role
    function amIDistributor() public view returns (bool) {
        return _distributors.has(msg.sender);
    }

    /// Function to assign caller `msg.sender` to distributor role
    function assignMeAsDistributor() public {
        _addDistributor(msg.sender);
    }

    /// Function to renounce caller `msg.sender` from distributor role
    function renounceMeFromDistributor() public {
        _removeDistributor(msg.sender);
    }

    /// Internal function to add account to this role
    /// @param account address to be Added
    /// @notice uses'Roles' library's internal function `add()`, refer to the library for more detail
    function _addDistributor(address account) internal {
        _distributors.add(account);
        emit DistributorAdded(account);
    }

    /// Internal function to remove account from this role
    /// @param account address to be removed
    /// @notice uses'Roles' library's internal function `remove()`, refer to the library for more detail
    function _removeDistributor(address account) internal {
        _distributors.remove(account);
        emit DistributorRemoved(account);
    }
}
