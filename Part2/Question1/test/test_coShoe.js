// import the contract artifacts

const CoShoe = artifacts.require('./CoShoe.sol') 


contract('CoShoe', function (accounts) {
  // test starts here

  // predefined variables
  const name = 'Julika'
  const image = 'image.com'
  const price = web3.utils.toWei('0.5', 'ether')

  // test whether 100 tokens are minted on deployment 

  it("mint 100 tokens on deployment", function() {
    
    let CoShoeInstance = await CoShoe.deployed()

    // get number of tokens deployed
    let tokenCounter = await CoShoeInstance.coShoeCount()

    // check that they are equal to 100

    assert.equal(tokenCounter, 100, 'did not mint 100 tokens on deployment');
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
    assert.equal(CoShoeInstance.shoesSold, 1, "Shoes sold counter does not match")

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
    await CoShoeInstance.buyShoe(
      name,
      image,
      { value: 0, from: accounts[1] }
    )
    // get the number of shoes sold 
    assert.equal(CoShoeInstance.shoesSold, 1, "Shoes sold counter does not match, and should not have changed")
  })

  // ensure that checkPurchases​ returns the correct number of ​true​s

//   it('should retrun the correct number of trues in checkPurchases function', async function() {

//     let CoShoeInstance = await CoShoe.deployed()
//     // register a song from account 0
//     let checkPurchase = await CoShoeInstance.checkPurchases({from: accounts[0]})

//     assert.equal(checkPurchase[0], true, "should be true") 


//   })



})


