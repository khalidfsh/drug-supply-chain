var MainChain = artifacts.require("./Core/MainChain.sol");

module.exports = function(deployer) {
  deployer.deploy(MainChain);
};
