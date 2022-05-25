pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./ERC721Mintable.sol";
import "./ZokratesSquareVerifier.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier {
    function verifyIsSquare(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public view returns (bool r) {
        bool success = verifyTx(a, b, c, input);
        return success;
    }
}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is PropertyToken {
    SquareVerifier public squareVerifier;

    constructor(address verifierAddress) public {
        squareVerifier = SquareVerifier(verifierAddress);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address to;
    }

    // TODO define an array of the above struct
    Solution[] solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) uniqueSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 indexed index, address indexed to);

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(
        address _to,
        uint256 _index,
        bytes32 _key
    ) public {
        Solution memory solution;
        solution.index = _index;
        solution.to = _to;

        solutions.push(solution);

        uniqueSolutions[_key] = solution;

        emit SolutionAdded(_index, _to);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    function mintNewNft(
        uint256 _tokenId,
        address _to,
        uint256[2] memory _a,
        uint256[2][2] memory _b,
        uint256[2] memory _c,
        uint256[2] memory _input
    ) public returns (bool) {
        bytes32 key = keccak256(abi.encodePacked(_a, _b, _c, _input));
        //  - make sure the solution is unique (has not been used before)
        require(
            uniqueSolutions[key].to == address(0),
            "Solution already exists"
        );

        //  - make sure the user verify the zksnarkverify function
        require(squareVerifier.verifyTx(_a, _b, _c, _input));

        //  - make sure it adds the solution
        addSolution(_to, _tokenId, key);

        //  - make sure you handle metadata as well as tokenSupply
        bool minted = super.mint(_to, _tokenId);
        return minted;
    }
}
