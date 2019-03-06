pragma solidity ^0.5.0;


/// @author Khalid F.Sh (@khalidfsh)
/// @title Partnership Ability Library Contract
/// @dev  Library for establishing a partnership and managing partner addresses, shares
/// @notice you can hack a little bit with arrays to make it multiparty 2*array
library Partnerships {

    /// Enumaration for defining variety of Partnership State
    enum PartnershipState {
        Restricted,
        Opened,
        Closed
    }

    struct Partnership {
        address payable owner;
        uint defultSharesPresntage;
        PartnershipState state;
        uint partnersIndex;
        mapping (uint => Partner) partners;
        mapping (address => bool) bearer;
        mapping (address => uint) indexOfPartners;
    }

    struct Partner {
        address payable partnerID;
        string name;
        uint shares;
    }

    function add(
        Partnership storage partnership, 
        address payable account, 
        string memory name, 
        uint _shares
    ) 
        internal 
    {
        uint shares = partnership.defultSharesPresntage;
        require(account != address(0));
        require(!has(partnership, account));
        if (partnership.state == PartnershipState.Restricted) {
            require(msg.sender == partnership.owner);
            shares = _shares;
        }     
        if (partnership.state == PartnershipState.Closed)
            return;

        partnership.bearer[account] = true;
        Partnerships.Partner memory newPartner;
        newPartner.partnerID = account;
        newPartner.name = name;
        newPartner.shares = shares;
        partnership.partners[partnership.partnersIndex] = newPartner;
        partnership.indexOfPartners[account] = partnership.partnersIndex;
        partnership.partnersIndex += 1;
        


    }

    function remove(Partnership storage partnership, address account) internal {
        require(account != address(0));
        require(has(partnership, account));

        partnership.bearer[account] = false;
        delete partnership.partners[partnership.indexOfPartners[account]];     
        delete partnership.indexOfPartners[account];
    }

    function has(Partnership storage partnership, address account) internal view returns(bool) {
        require(account != address(0));

        return partnership.bearer[account];
    }

    function sharesOf(Partnership storage partnership, address account) internal view returns(uint) {
        require(account != address(0));
        require(has(partnership, account));

        return partnership.partners[partnership.indexOfPartners[account]].shares / 100;
    }

    function active(Partnership storage partnership) internal view returns(Partner[] memory) {
        Partner[] memory _partners = new Partner[](partnership.partnersIndex);
        uint _index = 0;
        for (uint i = 0; i < partnership.partnersIndex; i++) {
            if (partnership.partners[i].partnerID != address(0)) {
                _partners[_index] = partnership.partners[i];
                _index += 1;
            }
        }
        return _partners;
    }

    function numberOfActive(Partnership storage partnership) internal view returns(uint) {
        uint count = 0;
        for (uint i = 0; i < partnership.partnersIndex; i++) {
            if (partnership.partners[i].partnerID != address(0)) {
                count ++;
            }
        }
        return count;
    }
}
