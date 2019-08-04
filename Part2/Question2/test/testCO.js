// import the contract artifacts

const COToken = artifacts.require('./COToken.sol') 


contract('COToken', accounts => {
    // test starts here
    
    const _name = "COToken";
    const _symbol = "CO";
    const _decimals = 0;

    const truffleAssert = require('truffle-assertions');
  
    beforeEach(async function() {
      token = await COToken.new(_name, _symbol, _decimals);
    }); // need to use async and await together
    // basically we want to wait for that functio to run before going to the next functions
  
    // initial tests to see whether ERC20 functionalities work

    it("should return the balance of token owner", function() {
        var token;
        return COToken.deployed().then(function(instance){
          token = instance;
          return token.balanceOf.call(accounts[0]);
        }).then(function(result){
          assert.equal(result.toNumber(), 0, 'balance is wrong');
        })
      })

      // testing the mint function
      // test whether it mint tokens if correct price is entered (will test with 10 tokens, meaning the price should be 0.3 ether) (0.01x10+0.2)
      // will use account 1
      // to see that 10 tokens are minted, need to check balanceOf function of minter and currentSupply function to see if there are now 10 tokens

      it("it should mint 10 tokens if 0.3 ether are paid", function() {
        var token;
        return COToken.deployed().then(function(instance){
          token = instance;
          return token.mint(accounts[1], 10, {value: web3.utils.toWei('0.3', 'ether'), from: accounts[1]});

        }).then(function(){
        return token.balanceOf.call(accounts[1]);
        }).then(function(result){
        assert.equal(result.toNumber(), 10, 'accounts[1] balance is wrong'); //check that balanced increased from account[1]
        }).then(function(){
        return token.currentSupply.call();
        }).then(function(result){
        assert.equal(result.toNumber(), 10, 'current supply is wrong'); //check that the current supply increased by 10
        })

    })

    // test mint function if incorrect price is paid
    // current supply is now 10, so to mint 5 tokens, the price would be 0.35 ether (0.01x15+0.2)
    it("expects a revert if incorrect price is paid in the mint function", async function() {

      let COTokenInstance = await COToken.deployed()
  
        // get number of tokens deployed
  
      await truffleAssert.reverts(COTokenInstance.mint(accounts[0], 5, {value: web3.utils.toWei('0.4', 'ether'), from: accounts[0]}))
  
    })


    // testing the burn function when called by the owner
    // will burn 5 tokens, but first need to mint tokens to owner (account[0])
    // when minting 10 tokens, the price will be 0.4 ether (0.01x20+0.2)
    // when burning 5 tokens after that, the sell price is 0.35 ether (0.01x15+0.2)
    // will also need to test currentSupply, which needs to decrease

    // first mint 10 tokesn to account(0)
      it("it should mint 10 tokens if 0.4 ether are paid by account 0", function() {
        var token;
        return COToken.deployed().then(function(instance){
          token = instance;
          return token.mint(accounts[0], 10, {value: web3.utils.toWei('0.4', 'ether'), from: accounts[1]});

        }).then(function(){
        return token.balanceOf.call(accounts[0]);
        }).then(function(result){
        assert.equal(result.toNumber(), 10, 'accounts[0] balance is wrong'); //check that balanced increased from account[1]
        })

    })

  
    // now we can test the burn function on account 0
    it("it should burn 5 tokens if 0.35 ether are paid", function() {
      var token;
      return COToken.deployed().then(function(instance){
        token = instance;
        return token.burn(accounts[0], 5, {value: web3.utils.toWei('0.35', 'ether'), from: accounts[0]});

      }).then(function(){
      return token.balanceOf.call(accounts[0]);
      }).then(function(result){
      assert.equal(result.toNumber(), 5, 'accounts[0] balance is wrong'); //check that balanced increased from account[1]
      }).then(function(){
      return token.currentSupply.call();
      }).then(function(result){
      assert.equal(result.toNumber(), 15, 'current supply is wrong'); //check that the current supply increased by 10
      })

  })

  // should not burn tokens if account 1 calls burn function, we would expect a revert as only the owner can call this function
  // price would now be 0.3 ether again
  // balance of account[0] should stay at 10 and currentSupply at 15

  it("expects a revert if non-owner calls burn function", async function() {

    let COTokenInstance = await COToken.deployed()

      // get number of tokens deployed

    await truffleAssert.reverts(COTokenInstance.burn(accounts[1], 5, {value: web3.utils.toWei('0.3', 'ether'), from: accounts[1]}))

  })


// test destroy function
// first test that it does not work when called by another account than account 0
it("it should not destroy the contract account[1] calls destroy function", async function() {
  
  let COTokenInstance = await COToken.deployed()

    // get number of tokens deployed

  await truffleAssert.reverts(COTokenInstance.destroy({from: accounts[1]}))
     

})

})
