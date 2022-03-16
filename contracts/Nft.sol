//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

//  import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
 import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PamPamNft is ERC721URIStorage {
  uint256 _tokenId;
  constructor()  ERC721("PamPam", "Pam") {}
  
  function mint(address _to, string calldata _uri) external  {
    _tokenId++;
    super._mint(_to, _tokenId);
    super._setTokenURI(_tokenId, _uri);
  }

  function totalSupply() public pure returns(uint) {
    return 20;
  }
 
}

// ipfs://QmXVX6Ru78M5qkzRycWiuLFT8bZcKRJcRhxQ9PXyymgmE2