# Dapp notary listing house

In this project, we will be minting our own tokens to represent titles of properties. Before minting a token, we will verify the owner owns the property. We will use zk-SNARKs to create a verification system which can prove you have title to the property without revealing that specific information on the property.

PS: For educational purposes, we will actually prove that the user owns the property if he knows 2 numbers with the 1st one being the square root of the 2nd number. :-)

Once the token has been verified we will place it on a blockchain market place (OpenSea) for others to purchase. Let's get started!

# Run and deploy the projects

## Environment

```bash
node v10.24.0
solidity: 0.5.2
ganache v7.0.2 (@ganache/cli: 0.1.3, @ganache/core: 0.1.3)
web3: 1.0.0-beta.37
```

## Local

```bash
# create a local ethereum blockchain with 35 nodes with RPC Listening on 127.0.0.1:8545
ganache-cli -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat" -a 35

# connect to the local blockchain
cd .\eth-contracts\
truffle console --network ganache_cli
```

Once connected:

```bash
# compile
compile
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang

# test
test
>
  Contract: TestERC721Mintable
    match erc721 spec
      √ should return total supply
      √ should get token balance
      √ should return token uri
      √ should transfer token from one owner to another (55ms)
    have ownership properties
      √ should fail when minting when address is not contract owner (52ms)
      √ should return contract owner

  Contract: SolnSquareVerifier
SolutionAdded:
    √ can add a new solution (caught by the event SolutionAdded) (626ms)
    √ can mint a new ERC721 token (588ms)

  Contract: ZokratesSquareVerifier
    √ should work with correct proof (518ms)
    √ should fail with incorrect proof (519ms)


  10 passing (5s)
```

To clean the contracts code:

```bash
npx prettier --write 'contracts/**/*.sol'
```

## Rinkeby

```bash
truffle console --network rinkeby
compile
migrate
```

```bash
Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 29970705 (0x1c95111)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0x889b6a8ad717c7a8eede94b24353d86e6b189f54d6e57df7b750d0a720bca8f5
undefined
undefined
undefined
undefined
   > Blocks: 1            Seconds: 20
   > contract address:    0x77d72634E505382660eeC7CE7323D603829ba9F7
   > block number:        10736662
   > block timestamp:     1653466688
   > account:             0xc6696eDf5e753f5B3009608F9e25ED2cb713C7fA
   > balance:             0.296381172277698665
   > gas used:            226537 (0x374e9)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00226537 ETH



   Deploying 'SolnSquareVerifier'
   ------------------------------
   > transaction hash:    0x80d2249c0790acbaac11f09fbe06cdf2312616495584a56402fbb5c163a3d437
   > Blocks: 0            Seconds: 0
   > contract address:    0x6E8Cc50ACBb75ABf892B4C2eac4F8659Da94cA8B
   > block number:        10736658
   > block timestamp:     1653466700
   > account:             0xc6696eDf5e753f5B3009608F9e25ED2cb713C7fA
   > balance:             0.252437382277698665
   > gas used:            3262081 (0x31c681)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.03262081 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.03488618 ETH


2_deploy_contracts.js
=====================

   Replacing 'SquareVerifier'
   --------------------------
   > transaction hash:    0xb244b4885b91c9f7c905489a0407657bc873da3a3ac31ec58222334aae9b52d2
undefined
undefined
   > Blocks: 1            Seconds: 9
   > contract address:    0xE4A031F2A2D967067032904AB18fEb78F2DF0378
   > block number:        10736664
   > block timestamp:     1653466718
   > account:             0xc6696eDf5e753f5B3009608F9e25ED2cb713C7fA
   > balance:             0.285344822277698665
   > gas used:            1057872 (0x102450)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.01057872 ETH



   Deploying 'SolnSquareVerifier'
   ------------------------------
   > transaction hash:    0x2ebd8adce7b8a17c3f7e5d2affc5f9e4e63996a7a9d64e1fda9a3001c98f9609
undefined
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.01057872 ETH

Summary
=======
> Total deployments:   5
> Final cost:          0.05830899 ETH
```

- Contract deployed on Rinkeby test network with the address:
  v1 (deprecated): 0x1ff1A6bF50F3440383a61774d25b5C92e567192F (https://rinkeby.etherscan.io/address/0x1ff1a6bf50f3440383a61774d25b5c92e567192f)
  v2: 0x6E8Cc50ACBb75ABf892B4C2eac4F8659Da94cA8B (https://rinkeby.etherscan.io/address/0x6e8cc50acbb75abf892b4c2eac4f8659da94ca8b)

- 10 non-fungible tokens (0x6E8Cc50ACBb75ABf892B4C2eac4F8659Da94cA8B) were minted. From tx 0x6fce05512b4a058cafab4d2ed1056a9a72950c2c6d759bbb1cea386968c1c01f to tx 0x79b4183d82c6dac469bb6dd6d29f788b57df8c1edae69693e288695d68f3e3d9

```bash
cd src
node .\mintToken.js
```

- Tokens are visible on the OpenSea NFTs marketplace storefront: https://testnets.opensea.io/collection/unidentified-contract-2s1vhm7rub

## ZoKrates

- zkSNARKS framework for ethereum
- zkSNARKS provides a layer of privacy for blockchains
- useful resouces:
  - https://github.com/jstoxrocky/zksnarks_example

```bash
docker run -v <path to your project folder>:/home/zokrates/code -ti zokrates/zokrates /bin/bash
```

- Commands run by the "trusted 3rd-party" to enable zk-SNARKS:

```bash
# Takes the file written in ZoKrates higher level language and compiles it into an arithmetic circuit
zokrates compile -i /home/zokrates/code/square/square.code

# Generates the proving_key and verification_key (both are publicly available) from the arithmetic circuit and the "toxic-waste" (because if users know it, they can generate fake proofs) parameter lambda
zokrates setup

# Creates a verifier.sol that contains the hardcoded verification_key and the public function verifyTx i.e the znark verifier
zokrates export-verifier
```

- Commands run by the "prover" to prove something to the ethereum community without revealing all the values contributing t othe proof

```bash
# Creates a witness for use in generating the proof. A proof is dependant on specific values of public and private arguments
# You need to change the parameters (-a 3 9) every time you need to create a new proof.
zokrates compute-witness -a 3 9

# Creates a proof tat is dependant on a witness and a proving_key
zokrates generate-proof
```

- Actions taken by an observer

The observer just has to check the output of the transaction the verifier sent to the verifyTx function. if it returns 'true' then the observer knows that the prover is right

```bash
docker cp a3c5bfc6b6c0:/home/zokrates/ C:\Users\azais\workspace\udacity\dapp-house-listing-service\
```

# Project Resources

- [Remix - Solidity IDE](https://remix.ethereum.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Truffle Framework](https://truffleframework.com/)
- [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
- [Open Zeppelin ](https://openzeppelin.org/)
- [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
- [Docker](https://docs.docker.com/install/)
- [ZoKrates](https://github.com/Zokrates/ZoKrates)
