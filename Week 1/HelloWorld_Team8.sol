// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/// @title Team 8 Homework
contract HelloWorld {

    /// @dev Stores the current message string
    string private text;

    /// @dev Stores the owner's address
    address public owner;

    /// @dev Sets the initial message and owner
    constructor() {
        text = "Hello World";
        owner = msg.sender;
    }

    /// @notice Returns the current message
    /// @return The current message
    function helloWorld() public view returns (string memory) {
        return text;
    }

    /// @notice Changes the current message
    /// @dev Only callable by the current owner
    /// @param newText The new message
    function setText(string calldata newText) public onlyOwner {
        text = newText;
    }

    /// @notice Transfers ownership to a new address
    /// @dev Only callable by the current owner
    /// @param newOwner The address to transfer ownership to
    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    /// @dev Ensures that the caller is the current owner
    modifier onlyOwner() {
        require (msg.sender == owner, "Caller is not the owner");
        _;
    }
}