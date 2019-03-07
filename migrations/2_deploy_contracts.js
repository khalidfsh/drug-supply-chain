var MainChain = artifacts.require("./Core/MainChain.sol");
var PartnershipsLib = artifacts.require("./utils/Partnerships.sol");


module.exports = function(deployer) {
    deployer.deploy(PartnershipsLib);
    deployer.link(PartnershipsLib, MainChain);
    deployer.deploy(MainChain);
};
