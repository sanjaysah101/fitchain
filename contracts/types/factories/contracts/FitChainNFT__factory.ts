/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  FitChainNFT,
  FitChainNFTInterface,
} from "../../contracts/FitChainNFT";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "BadgeMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "mintBadge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenIdCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040518060400160405280600e81526020017f466974436861696e4261646765730000000000000000000000000000000000008152506040518060400160405280600381526020017f4649540000000000000000000000000000000000000000000000000000000000815250816000908161008c9190610335565b50806001908161009c9190610335565b50505033600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610407565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061016657607f821691505b6020821081036101795761017861011f565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026101e17fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826101a4565b6101eb86836101a4565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600061023261022d61022884610203565b61020d565b610203565b9050919050565b6000819050919050565b61024c83610217565b61026061025882610239565b8484546101b1565b825550505050565b600090565b610275610268565b610280818484610243565b505050565b5b818110156102a45761029960008261026d565b600181019050610286565b5050565b601f8211156102e9576102ba8161017f565b6102c384610194565b810160208510156102d2578190505b6102e66102de85610194565b830182610285565b50505b505050565b600082821c905092915050565b600061030c600019846008026102ee565b1980831691505092915050565b600061032583836102fb565b9150826002028217905092915050565b61033e826100e5565b67ffffffffffffffff811115610357576103566100f0565b5b610361825461014e565b61036c8282856102a8565b600060209050601f83116001811461039f576000841561038d578287015190505b6103978582610319565b8655506103ff565b601f1984166103ad8661017f565b60005b828110156103d5578489015182556001820191506020850194506020810190506103b0565b868310156103f257848901516103ee601f8916826102fb565b8355505b6001600288020188555050505b505050505050565b612058806104166000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806370a0823111610097578063a22cb46511610066578063a22cb465146102ad578063b88d4fde146102c9578063c87b56dd146102e5578063e985e9c51461031557610100565b806370a08231146102235780638da5cb5b1461025357806395d89b411461027157806398bdf6f51461028f57610100565b806323b872dd116100d357806323b872dd1461019f57806342842e0e146101bb5780634a36f6e4146101d75780636352211e146101f357610100565b806301ffc9a71461010557806306fdde0314610135578063081812fc14610153578063095ea7b314610183575b600080fd5b61011f600480360381019061011a91906117bf565b610345565b60405161012c9190611807565b60405180910390f35b61013d610427565b60405161014a91906118b2565b60405180910390f35b61016d6004803603810190610168919061190a565b6104b9565b60405161017a9190611978565b60405180910390f35b61019d600480360381019061019891906119bf565b6104d5565b005b6101b960048036038101906101b491906119ff565b6104eb565b005b6101d560048036038101906101d091906119ff565b6105ed565b005b6101f160048036038101906101ec9190611a52565b61060d565b005b61020d6004803603810190610208919061190a565b610714565b60405161021a9190611978565b60405180910390f35b61023d60048036038101906102389190611a52565b610726565b60405161024a9190611a8e565b60405180910390f35b61025b6107e0565b6040516102689190611978565b60405180910390f35b610279610806565b60405161028691906118b2565b60405180910390f35b610297610898565b6040516102a49190611a8e565b60405180910390f35b6102c760048036038101906102c29190611ad5565b61089e565b005b6102e360048036038101906102de9190611c4a565b6108b4565b005b6102ff60048036038101906102fa919061190a565b6108d9565b60405161030c91906118b2565b60405180910390f35b61032f600480360381019061032a9190611ccd565b610942565b60405161033c9190611807565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061041057507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610420575061041f826109d6565b5b9050919050565b60606000805461043690611d3c565b80601f016020809104026020016040519081016040528092919081815260200182805461046290611d3c565b80156104af5780601f10610484576101008083540402835291602001916104af565b820191906000526020600020905b81548152906001019060200180831161049257829003601f168201915b5050505050905090565b60006104c482610a40565b506104ce82610ac8565b9050919050565b6104e782826104e2610b05565b610b0d565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361055d5760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016105549190611978565b60405180910390fd5b6000610571838361056c610b05565b610b1f565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146105e7578382826040517f64283d7b0000000000000000000000000000000000000000000000000000000081526004016105de93929190611d6d565b60405180910390fd5b50505050565b610608838383604051806020016040528060008152506108b4565b505050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461069d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161069490611df0565b60405180910390fd5b6106a981600654610d39565b8073ffffffffffffffffffffffffffffffffffffffff167fc5e5b314108c1f776c2302351b8278910ddb812b122b2717b1bc973146145e9a6006546040516106f19190611a8e565b60405180910390a26006600081548092919061070c90611e3f565b919050555050565b600061071f82610a40565b9050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036107995760006040517f89c62b640000000000000000000000000000000000000000000000000000000081526004016107909190611978565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60606001805461081590611d3c565b80601f016020809104026020016040519081016040528092919081815260200182805461084190611d3c565b801561088e5780601f106108635761010080835404028352916020019161088e565b820191906000526020600020905b81548152906001019060200180831161087157829003601f168201915b5050505050905090565b60065481565b6108b06108a9610b05565b8383610d57565b5050565b6108bf8484846104eb565b6108d36108ca610b05565b85858585610ec6565b50505050565b60606108e482610a40565b5060006108ef611077565b9050600081511161090f576040518060200160405280600081525061093a565b806109198461108e565b60405160200161092a929190611ec3565b6040516020818303038152906040525b915050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600080610a4c8361115c565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610abf57826040517f7e273289000000000000000000000000000000000000000000000000000000008152600401610ab69190611a8e565b60405180910390fd5b80915050919050565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600033905090565b610b1a8383836001611199565b505050565b600080610b2b8461115c565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614610b6d57610b6c81848661135e565b5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610bfe57610baf600085600080611199565b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614610c81576001600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b846002600086815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4809150509392505050565b610d53828260405180602001604052806000815250611422565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610dc857816040517f5b08ba18000000000000000000000000000000000000000000000000000000008152600401610dbf9190611978565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610eb99190611807565b60405180910390a3505050565b60008373ffffffffffffffffffffffffffffffffffffffff163b1115611070578273ffffffffffffffffffffffffffffffffffffffff1663150b7a02868685856040518563ffffffff1660e01b8152600401610f259493929190611f3c565b6020604051808303816000875af1925050508015610f6157506040513d601f19601f82011682018060405250810190610f5e9190611f9d565b60015b610fe5573d8060008114610f91576040519150601f19603f3d011682016040523d82523d6000602084013e610f96565b606091505b506000815103610fdd57836040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600401610fd49190611978565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461106e57836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016110659190611978565b60405180910390fd5b505b5050505050565b606060405180602001604052806000815250905090565b60606000600161109d84611446565b01905060008167ffffffffffffffff8111156110bc576110bb611b1f565b5b6040519080825280601f01601f1916602001820160405280156110ee5781602001600182028036833780820191505090505b509050600082602001820190505b600115611151578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a858161114557611144611fca565b5b049450600085036110fc575b819350505050919050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b80806111d25750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b156113065760006111e284610a40565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415801561124d57508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b8015611260575061125e8184610942565b155b156112a257826040517fa9fbf51f0000000000000000000000000000000000000000000000000000000081526004016112999190611978565b60405180910390fd5b811561130457838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b836004600085815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b611369838383611599565b61141d57600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036113de57806040517f7e2732890000000000000000000000000000000000000000000000000000000081526004016113d59190611a8e565b60405180910390fd5b81816040517f177e802f000000000000000000000000000000000000000000000000000000008152600401611414929190611ff9565b60405180910390fd5b505050565b61142c838361165a565b611441611437610b05565b6000858585610ec6565b505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083106114a4577a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000838161149a57611499611fca565b5b0492506040810190505b6d04ee2d6d415b85acef810000000083106114e1576d04ee2d6d415b85acef810000000083816114d7576114d6611fca565b5b0492506020810190505b662386f26fc10000831061151057662386f26fc10000838161150657611505611fca565b5b0492506010810190505b6305f5e1008310611539576305f5e100838161152f5761152e611fca565b5b0492506008810190505b612710831061155e57612710838161155457611553611fca565b5b0492506004810190505b60648310611581576064838161157757611576611fca565b5b0492506002810190505b600a8310611590576001810190505b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415801561165157508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061161257506116118484610942565b5b8061165057508273ffffffffffffffffffffffffffffffffffffffff1661163883610ac8565b73ffffffffffffffffffffffffffffffffffffffff16145b5b90509392505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036116cc5760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016116c39190611978565b60405180910390fd5b60006116da83836000610b1f565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461174e5760006040517f73c6ac6e0000000000000000000000000000000000000000000000000000000081526004016117459190611978565b60405180910390fd5b505050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61179c81611767565b81146117a757600080fd5b50565b6000813590506117b981611793565b92915050565b6000602082840312156117d5576117d461175d565b5b60006117e3848285016117aa565b91505092915050565b60008115159050919050565b611801816117ec565b82525050565b600060208201905061181c60008301846117f8565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561185c578082015181840152602081019050611841565b60008484015250505050565b6000601f19601f8301169050919050565b600061188482611822565b61188e818561182d565b935061189e81856020860161183e565b6118a781611868565b840191505092915050565b600060208201905081810360008301526118cc8184611879565b905092915050565b6000819050919050565b6118e7816118d4565b81146118f257600080fd5b50565b600081359050611904816118de565b92915050565b6000602082840312156119205761191f61175d565b5b600061192e848285016118f5565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061196282611937565b9050919050565b61197281611957565b82525050565b600060208201905061198d6000830184611969565b92915050565b61199c81611957565b81146119a757600080fd5b50565b6000813590506119b981611993565b92915050565b600080604083850312156119d6576119d561175d565b5b60006119e4858286016119aa565b92505060206119f5858286016118f5565b9150509250929050565b600080600060608486031215611a1857611a1761175d565b5b6000611a26868287016119aa565b9350506020611a37868287016119aa565b9250506040611a48868287016118f5565b9150509250925092565b600060208284031215611a6857611a6761175d565b5b6000611a76848285016119aa565b91505092915050565b611a88816118d4565b82525050565b6000602082019050611aa36000830184611a7f565b92915050565b611ab2816117ec565b8114611abd57600080fd5b50565b600081359050611acf81611aa9565b92915050565b60008060408385031215611aec57611aeb61175d565b5b6000611afa858286016119aa565b9250506020611b0b85828601611ac0565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611b5782611868565b810181811067ffffffffffffffff82111715611b7657611b75611b1f565b5b80604052505050565b6000611b89611753565b9050611b958282611b4e565b919050565b600067ffffffffffffffff821115611bb557611bb4611b1f565b5b611bbe82611868565b9050602081019050919050565b82818337600083830152505050565b6000611bed611be884611b9a565b611b7f565b905082815260208101848484011115611c0957611c08611b1a565b5b611c14848285611bcb565b509392505050565b600082601f830112611c3157611c30611b15565b5b8135611c41848260208601611bda565b91505092915050565b60008060008060808587031215611c6457611c6361175d565b5b6000611c72878288016119aa565b9450506020611c83878288016119aa565b9350506040611c94878288016118f5565b925050606085013567ffffffffffffffff811115611cb557611cb4611762565b5b611cc187828801611c1c565b91505092959194509250565b60008060408385031215611ce457611ce361175d565b5b6000611cf2858286016119aa565b9250506020611d03858286016119aa565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611d5457607f821691505b602082108103611d6757611d66611d0d565b5b50919050565b6000606082019050611d826000830186611969565b611d8f6020830185611a7f565b611d9c6040830184611969565b949350505050565b7f556e617574686f72697a65640000000000000000000000000000000000000000600082015250565b6000611dda600c8361182d565b9150611de582611da4565b602082019050919050565b60006020820190508181036000830152611e0981611dcd565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611e4a826118d4565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611e7c57611e7b611e10565b5b600182019050919050565b600081905092915050565b6000611e9d82611822565b611ea78185611e87565b9350611eb781856020860161183e565b80840191505092915050565b6000611ecf8285611e92565b9150611edb8284611e92565b91508190509392505050565b600081519050919050565b600082825260208201905092915050565b6000611f0e82611ee7565b611f188185611ef2565b9350611f2881856020860161183e565b611f3181611868565b840191505092915050565b6000608082019050611f516000830187611969565b611f5e6020830186611969565b611f6b6040830185611a7f565b8181036060830152611f7d8184611f03565b905095945050505050565b600081519050611f9781611793565b92915050565b600060208284031215611fb357611fb261175d565b5b6000611fc184828501611f88565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600060408201905061200e6000830185611969565b61201b6020830184611a7f565b939250505056fea264697066735822122012234b685c27fb900959314ae8d390a86a74981f0fe9d4c4ec144c2bfd62c50e64736f6c634300081c0033";

type FitChainNFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FitChainNFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FitChainNFT__factory extends ContractFactory {
  constructor(...args: FitChainNFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      FitChainNFT & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): FitChainNFT__factory {
    return super.connect(runner) as FitChainNFT__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FitChainNFTInterface {
    return new Interface(_abi) as FitChainNFTInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): FitChainNFT {
    return new Contract(address, _abi, runner) as unknown as FitChainNFT;
  }
}
