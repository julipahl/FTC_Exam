pragma solidity >=0.4.21 <0.6.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract CO is Ownable {

// first we implement all the ERC functionalities

    using SafeMath for uint256;
    mapping (address => uint256) public _balances; // to obtain balance of a given address
    mapping (address => mapping (address => uint256)) public _allowed; // the amount allowed to spend

    // declaring variables
   uint public _totalSupply; // these are the total number of possible tokens
   uint public _currentSupply; // this is for the number of tokens in circulation to determine the price
   string public _name;
   string public _symbol;
   uint public _decimals;
   address payable _contractOwner;

   // need a constructor because we are defining a state variable
    constructor(string memory name, string memory symbol, uint decimals) public {
        // the contract is constructed once
        _totalSupply = 100;
        _name = name;
        _symbol = symbol;
        _decimals = decimals;

        _contractOwner = msg.sender;
    }

    // returns the account balance of another account with address _sender
   function balanceOf(address _owner) external view returns (uint256){
       return _balances[_owner];
   }

  // Total number of tokens in existence
   function totalSupply() external view returns (uint256) {
       return _totalSupply;
   }

   function currentSupply() external view returns (uint256) {
       return _currentSupply;
   }

   // Function to check the amount of tokens that an owner("sender") allowed to a recipient.
   function allowance(address owner, address to) external view returns (uint256){
      return _allowed[owner][to];
   }

   function transfer(address to, uint256 amount) external returns (bool){
        require(amount <= _balances[msg.sender], "not enough money");
        require(to != address(0), "cant have that address");

        _balances[msg.sender] = _balances[msg.sender].sub(amount);
        _balances[to] = _balances[to].add(amount);
        return true;
   }

   // Transfers _value amount of tokens to address _to, and MUST fire the Transfer event.
   // The function SHOULD throw if the message caller’s account balance does not have enough tokens to spend.

   // is address(0) our address? or the "senders" address


   function approve(address sender, uint256 amount) external returns (bool){
      _allowed[msg.sender][sender] = amount;
      return true;
    }


   function transferFrom(address sender, address to, uint256 amount) external returns (bool){
    require(amount <= _balances[sender], "value must be less than balance");
    require(amount <= _allowed[sender][msg.sender], "value must be less than what is allowed to be sent");
    require(sender != address(0), "cant have that address");

    _balances[sender] = _balances[sender].sub(amount);
    _balances[to] = _balances[to].add(amount);

    _allowed[sender][msg.sender] = _allowed[sender][msg.sender].sub(amount); // subtract what is allowed to be spent
    return true;
   }

   // buyPrice​ function calculates the price for the purchase of ​n CO tokens based on the curve defined above
   function buyPrice(uint256 _tokenAmount) public returns(uint) {
       require(_currentSupply <= _totalSupply, "not enough tokens left"); // ensure only a max of 100 tokens are minted

       _currentSupply = _currentSupply.add(_tokenAmount);

       uint256 buy_price = 1 * (10**16) * _currentSupply + 2 * (10**17); //price is in ether, so need to convert appropriately
       return buy_price;
   }

   // sellPrice function that calculates the price for the sale of ​n​ COtokens based on the curve defined above.

   function sellPrice(uint256 _tokenAmount) public returns(uint) {
       require(_currentSupply <= _totalSupply, "not enough tokens left"); // ensure only a max of 100 tokens are minted
       require(_currentSupply > 0, "cant have less than 0 tokens"); // can't have a negative supply or tokens

       _currentSupply = _currentSupply.sub(_tokenAmount);

       uint256 sell_price = 1 * (10**16) * _currentSupply + 2 * (10**17); //price is in ether, so need to convert appropriately
       return sell_price;
   }

//  ​mint​ function that creates tokens if the correct current price istransferred to the contract. The price is determined by the ​buyPrice​ function.

    function mint(address _account, uint256 _tokenAmount) public payable {
        require(_account != address(0), "Account is not allowed to be account(0)");

        uint currentPrice = buyPrice(_tokenAmount);
        require(msg.value == currentPrice, "not the correct amount");

        _balances[_account] = _balances[_account].add(_tokenAmount);
        // already increased the number of tokens in the buyPrice functions, so do not need to do that again
    }

  // ​burn​ function that can only be called by the ​owner​ (i.e., only theowner​ can sell tokens back to the curve and withdraw the funds).

    function burn(address _account, uint256 _tokenAmount) public payable onlyOwner {

        uint currentPrice = sellPrice(_tokenAmount);
        require(msg.value == currentPrice, "not the correct amount");

        address(msg.sender).transfer(msg.value); // pay ether to contract owner for selling tokens back to curve
        _balances[_account] = _balances[_account].sub(_tokenAmount);
    }

    // function that will self destruct the contract
    // can only be called by the owner
    // and can only be called by the owner if he has all the tokens

    function destroy() public payable onlyOwner {
        require(_balances[_contractOwner] == 100, "owner does not own all tokens");

        selfdestruct(_contractOwner);
    }

}