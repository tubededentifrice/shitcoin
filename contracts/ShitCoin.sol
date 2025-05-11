// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ShitCoin Token
 * @dev Implementation of a customizable ERC20 token with role-based access control.
 *      Includes minting, burning, and pausing capabilities.
 */
contract ShitCoin is AccessControl, ERC20, ERC20Burnable, ERC20Pausable, ERC20Permit, ReentrancyGuard {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    /**
     * @dev Initializes the token with customizable name and symbol
     * @param name_ The name of the token
     * @param symbol_ The symbol of the token
     */
    constructor(
        string memory name_ = "ShitCoin",
        string memory symbol_ = "SHIT"
    ) ERC20(name_, symbol_) ERC20Permit(name_) {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _grantRole(MINTER_ROLE, _msgSender());
        _grantRole(BURNER_ROLE, _msgSender());
        _grantRole(PAUSER_ROLE, _msgSender());
    }

    /**
     * @dev Creates `amount` new tokens for `to`.
     * @param to The address that will receive the minted tokens
     * @param amount The amount of tokens to mint
     *
     * Requirements:
     * - The caller must have the MINTER_ROLE
     */
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) nonReentrant {
        _mint(to, amount);
    }

    /**
     * @dev Burns `amount` tokens from `from` address.
     * @param from The address to burn tokens from
     * @param amount The amount of tokens to burn
     *
     * Requirements:
     * - The caller must have the BURNER_ROLE
     */
    function burnFrom(address from, uint256 amount) public onlyRole(BURNER_ROLE) nonReentrant {
        _burn(from, amount);
    }

    /**
     * @dev Pauses all token transfers.
     *
     * Requirements:
     * - The caller must have the PAUSER_ROLE
     */
    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    /**
     * @dev Unpauses all token transfers.
     *
     * Requirements:
     * - The caller must have the PAUSER_ROLE
     */
    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    /**
     * @dev Hook that is called before any transfer of tokens, including minting and burning.
     */
    function _update(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, amount);
    }
}
