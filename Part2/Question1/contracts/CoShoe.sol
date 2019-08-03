pragma solidity ^0.5;

contract CoShoe {

    // struct for each unique shoe called Shoe, which holds 4 variables used to identify each unique shoe

    struct Shoe {
        address owner;
        string name;
        string image;
        bool sold;
    }

    // price is s state variable with the value of 0.5 ether converted to wei

    uint public price = 0.5*(10**18);
    uint public shoesSold = 0;

    Shoe[] public shoes; // array holding all the instances of Shoe

// the constructor below creats 100 CoShoe tokens
    constructor (uint TokenAmount) public {

        for (uint i = 1; i <= TokenAmount; i++)
        {
        address _owner = msg.sender;
        string memory _name = "";
        string memory _image = "";
        bool _sold = false;

        shoes.push(Shoe(_owner, _name, _image, _sold));
        }
    }

    // for a check I will inculde a count for the number of tokens in shoes array
    function coShoeCount() public view returns (uint256) {
        return shoes.length;
    }

    function buyShoe(string memory _name, string memory _image) public payable returns(bool) {
        require(msg.value == price, "Not the correct Price");
        // can use msg.value to check whether the price is correct as is carries the value of the transaction in wei

        // check that there are shoes available and the first one that is false get sold, else return false and nothing is executed
        for (uint i = 0; i < shoes.length; i++)
        {
            if(shoes[i].sold == false){
                shoes[i].owner = msg.sender;
                shoes[i].name = _name;
                shoes[i].image = _image;
                shoes[i].sold = true;

                shoesSold = shoesSold + 1; // add number of shoes sold
                return true;
            }

        }
        // otherwise return false
        return false;
    }

    function checkPurchases() public view returns(bool[100] memory) {

        bool[] memory yourPurchases = new bool[](100); // create memory array to safe gas

        for (uint i = 0; i < shoes.length; i++){
            if(shoes[i].owner == msg.sender){

                yourPurchases[i] = true;

            } else {

                yourPurchases[i] = false;

            }
        }

        return yourPurchases;
    }


}