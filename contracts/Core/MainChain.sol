pragma solidity ^0.5.0;

/// Import supply chain `Base` contract
import "../Base/SupplyChain.sol";

/// Import `Ownable` contract from OpenZeppelin package
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/// Import `Secondary` contract from OpenZeppelin package
import "openzeppelin-solidity/contracts/ownership/Secondary.sol";


/// @author Khalid F.Sh
/// @title Main Chain Contract
contract MainChain is SupplyChain, Ownable, Secondary, Pausable {
    
}
