pragma solidity ^0.5.0;

/// Import the 'Roles' library from OpenZeppelin contracts package
import "openzeppelin-solidity/contracts/access/Roles.sol";


/// @author Khalid F.Sh
/// @title A Regulator Role Contract
/// @dev contract for adding, removing and checking an address in the container '_regulators' Role.
/// @notice functionalty in this contract are internal to be managed in './Rolable.sol' contract.
contract Regulator {

    /// using Role struct from 'Roles' library
    using Roles for Roles.Role;

    /// 2 events, one for Adding, and other for Removing
    event RegulatorAdded(address indexed account);
    event RegulatorRemoved(address indexed account);

    /// structure '_regulators' inherited from 'Roles' library
    Roles.Role private _regulators;

    /// @notice constructer will assign the deployer as 1st regulator
    constructor () internal {
        _addRegulator(msg.sender);
    }

    // modifier that checks to see if `msg.sender` has regulator role
    modifier onlyRegulator() {
        require(isRegulator(msg.sender), "You Don't have Premetion!");
        _;
    }

    /// Function to check even he has regulator role or not
    /// @param account address to be checked
    /// @return boolean for this address state in `_regulators` Role
    /// @notice uses'Roles' library's internal function `has()` to check, refer to library for more detail
    function isRegulator(address account) public view returns (bool) {
        return _regulators.has(account);
    }

    /// Function to check caller `msg.sender` if he has regulator role
    /// @return boolean for caller address state in `_regulators` Role
    function amIRegulator() public view returns (bool) {
        return _regulators.has(msg.sender);
    }

    /// Function to add account to regulator role
    ///@param account address to be Added
    ///@notice `onlyRegulator` modifier  assignd to sure that the whole role groub regulated
    function addRegulator(address account) public onlyRegulator() {
        _addRegulator(account);
    }

    /// Function to renounce caller `msg.sender` from regulator role
    function renounceMeFromRegulator() public {
        _removeRegulator(msg.sender);
    }

    /// Internal function to add account to this role
    /// @param account address to be Added
    /// @notice uses'Roles' library's internal function `add()`, refer to the library for more detail
    function _addRegulator(address account) internal {
        _regulators.add(account);
        emit RegulatorAdded(account);
    }

    /// Internal function to remove account from this role
    /// @param account address to be removed
    /// @notice uses'Roles' library's internal function `remove()`, refer to the library for more detail
    function _removeRegulator(address account) internal {
        _regulators.remove(account);
        emit RegulatorRemoved(account);
    }
}
