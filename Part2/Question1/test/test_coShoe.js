// import the contract artifacts

const CoShoe = artifacts.require('./CoShoe.sol') 


contract('CoShoe', accounts => {
  // test starts here
  

  beforeEach(async function() {
    token = await CoShoe.new();
  }); // need to use async and await together
  // basically we want to wait for that functio to run before going to the next functions

  // test whether 100 tokens are minted on deployment 

  it("mint 100 tokens on deployment", function() {
    var token;
    return CoShoe.deployed().then(function(instance){
      token = instance;

      return token.coShoeCount.call(accounts[0]);
    }).then(function(result){
      assert.equal(result.toNumber(), 100, 'did not mint 100 tokens on deployment');
    })
  })

})
