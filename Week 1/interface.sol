// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/// @title A simple HelloWorld interface
/// @notice This interface includes basic functions for a HelloWorld contract.
/// @dev The contract address at deployment is: 0xF582E219513CDf39678C56AE6A169C50B2D9aC16
interface IHelloWorld {

    /// @notice Returns the current text stored in the contract.
    /// @return The current text stored in the contract.
    function helloWorld() external view returns (string memory);

    /// @notice Updates the text stored in the contract.
    /// @dev This function can only be called by the contract owner.
    /// @param newText The new text to be stored in the contract.
    function setText(string calldata newText) external;

    /// @notice Transfers ownership of the contract to a new address.
    /// @dev This function can only be called by the contract owner.
    /// @param newOwner The address to transfer ownership to.
    function transferOwnership(address newOwner) external;

}