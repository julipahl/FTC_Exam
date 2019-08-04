const COToken = artifacts.require("./COToken.sol");
const CoShoe = artifacts.require("./CoShoe.sol");

module.exports = function(deployer) {
    deployer.deploy(COToken, "COToken", "CO", 0).then((contractInstance) => {
    deployer.deploy(CoShoe, contractInstance.address);
  })

}