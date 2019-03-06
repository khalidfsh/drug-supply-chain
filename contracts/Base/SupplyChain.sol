pragma solidity ^0.5.0;

/// Import main chains contracts
import "./Storage/Drug.sol";
import "./Storage/DrugDesign.sol";

/// Import Main Roles contract `Rolable.sol`
import "../AccessControl/Rolable.sol";

/// Import Pausable contract from OpenZeppelin library
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";


/// @author Khalid F.Sh
/// @title Supply Chain Contract
contract SupplyChain is Rolable, Pausable, DrugDesign, Drug {
    
}
