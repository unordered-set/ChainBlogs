//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Blog {
    uint32 private _latest;
    mapping(uint32 => string) private _records;
    address private _owner;

    constructor() {
        _latest = 0;
        _records[_latest] = "";
        _owner = msg.sender;
    }

    function addRecord(string memory body) public {
        require(msg.sender == _owner);

        _latest += 1;
        _records[_latest] = body;
    }

    function getRecord(uint32 id) public view returns (string memory) {
        require(id >= 0 && id <= _latest);
        return _records[id];
    }

    function getLatestRecordId() public view returns (uint32) {
        return _latest;
    }

    function editRecord(uint32 id, string memory body) public {
        require(msg.sender == _owner);
        require(id >= 0 && id <= _latest);
        _records[id] = body;
    }

    function deleteRecord(uint32 id) public {
        editRecord(id, "");
    }
}
