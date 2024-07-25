// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleOracle is Ownable {
    uint256 public data;

    event DataUpdated(uint256 indexed newData);

    constructor() Ownable(msg.sender){
        data = 0;
    }

    function updateData(uint256 _data) external onlyOwner {
        data = _data;
        emit DataUpdated(_data);
    }
}