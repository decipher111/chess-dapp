pragma solidity 0.5.16;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract SicilianToken is ERC20 {
  string public name = "Sicilian Token";
  string public symbol = "SCT";
  uint public INITIAL_SUPPLY = 120000;

  constructor() public {
    _mint(msg.sender,INITIAL_SUPPLY);
  }
}