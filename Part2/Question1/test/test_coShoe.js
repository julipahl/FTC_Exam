// import the contract artifacts

const CoShoe = artifacts.require('./CoShoe.sol') 


contract('CoShoe', accounts => {
  // test starts here

  // predefined variables
  const name = 'Julika'
  const image = 'image.com'
  const name2 = 'Nic'
  const image2 = 'image2.com'
  const price = web3.utils.toWei('0.5', 'ether')

  const truffleAssert = require('truffle-assertions');

  beforeEach(async function() {
    token = await COToken.new(2);
  }); 

  // test whether 100 tokens are minted on deployment 

  it("mint 100 tokens on deployment", async function() {
    
    let CoShoeInstance = await CoShoe.deployed()

    // get number of tokens deployed
    let tokenCounter = await CoShoeInstance.coShoeCount()

    // check that they are equal to 100

    assert.equal(tokenCounter, 2, 'did not mint 100 tokens on deployment')
    })

    
  // test that buyShoe​ correctly transfers ownership, sets the name and the image, sets sold,and updates ​soldShoes​ count

  it('should change shoe information accordingly when purchase is made ', async function () {
    
    let CoShoeInstance = await CoShoe.deployed()
    
    // purchase a shoe
    await CoShoeInstance.buyShoe(
      name,
      image,
      { value: price, from: accounts[0] }
    )
    // get the number of shoes sold 
      let soldCounter = await CoShoeInstance.shoesSoldCount()
    
      assert.equal(soldCounter.toNumber(), 1, "Shoes sold counter does not match") // testing counter

    // retrieve the shoe details
      let shoe = await CoShoeInstance.shoes(0)
      // check that they match the original song details
      assert.equal(shoe['owner'], accounts[0], 'owner does not match')
      assert.equal(shoe['name'], name, 'name does not match')
      assert.equal(shoe['image'], image, 'image does not match')
      assert.equal(shoe['sold'], true, 'sold does not match')

  })

  // ensure buyShoe reverts if the correct value is not paid

  it('should not allow you to buy a shoe if value is not 0.5 ether ', async function () {
    
    let CoShoeInstance = await CoShoe.deployed()
    // register a song from account 0
    await truffleAssert.reverts(CoShoeInstance.buyShoe(
      name,
      image,
      { value: 0, from: accounts[1] }
    ))
    
  })

  // ensure that checkPurchases​ returns the correct number of ​true​s
  // first need to purchase a shoe with another address than address[0], as it is the writer of the contract and currently owner of all shoes
  it('should change shoe information accordingly when purchase is made ', async function () {
    
    let CoShoeInstance = await CoShoe.deployed()
    
    // purchase a shoe
    await CoShoeInstance.buyShoe(
      name2,
      image2,
      { value: price, from: accounts[1] }
    )
    // get the number of shoes sold 
      let soldCounter = await CoShoeInstance.shoesSoldCount()
    
      assert.equal(soldCounter.toNumber(), 2, "Shoes sold counter does not match") // testing counter
  })

  
  // since my function in solidity did not work, this test is just to show how I would have tested it

  it('should return the correct number of trues in checkPurchases function', async function() {

    let CoShoeInstance = await CoShoe.deployed()
    // register a song from account 0
    let checkPurchase = await CoShoeInstance.checkPurchases({from: accounts[1]})

    var truevalues = checkPurchase.filter(function(element) {
      return (element.select == true);
    });

    var count = truevalues.length;

    assert.equal(count, 1, "should be true") // need to get one true


  })

  // would also need to test that no shoe can be purchased if all 100 were already purchased by someone else
  // i do this by deploying a test with only 2 shoes to buy 
  it('should not allow you to buy a if no shoes are left', async function () {
    
    let CoShoeInstance = await CoShoe.deployed()
    // register a song from account 0
    await truffleAssert.reverts(CoShoeInstance.buyShoe(
      name,
      image,
      { value: price, from: accounts[1] }
    ))
    
  })


})


