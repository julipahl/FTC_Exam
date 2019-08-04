// const COToken = artifacts.require("./COToken.sol");
// const CoShoe = artifacts.require("./CoShoe.sol");

// module.exports = function(deployer) {
//     deployer.deploy(COToken, "COToken", "CO", 0).then((contractInstance) => {
//     deployer.deploy(CoShoe, contractInstance.address);
//   })

// }

var COToken = artifacts.require("./COToken.sol");
var CoShoe = artifacts.require("./CoShoe.sol");

module.exports = function(deployer) {
  deployer.deploy(COToken, "CoToken", "CO", 0).then(function(){
        return deployer.deploy(CoShoe, COToken.address)
});
};

// module.exports = async function(deployer) {
//   const COTokenInstance = await deployer.deploy(COToken, "CoToken", "CO", 0);
//   await deployer.deploy(CoShoe, COTokenInstance.address)
// };