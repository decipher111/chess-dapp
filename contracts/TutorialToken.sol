pragma solidity 0.5.16;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract TutorialToken is ERC20 {
  string public name = "TutorialToken";
  string public symbol = "TT";
  uint public INITIAL_SUPPLY = 120000;

  constructor() public {
    _mint(msg.sender,INITIAL_SUPPLY);
  }

}


