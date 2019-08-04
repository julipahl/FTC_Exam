const COToken = artifacts.require("./COToken.sol");

module.exports = function(deployer) {
  deployer.deploy(COToken, "COToken", "CO", 0);
};