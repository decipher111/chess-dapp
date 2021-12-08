pragma solidity 0.5.16;

contract Chess {
  string public name = "";

  function getter() public view returns(string memory){
      return name;
  }


  constructor() public {
    name = "my name";
  }

}