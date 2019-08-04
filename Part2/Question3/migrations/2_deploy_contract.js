const COToken = artifacts.require("./COToken.sol");
const COShoe = artifacts.require("./COShoe.sol")

module.exports = function(deployer) {
    deployer.deploy(COToken, "COToken", "CO", 0).then((contractInstance) => {
    deployer.deploy(COShoe, contractInstance.address);
  })

}