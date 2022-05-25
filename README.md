# Dapp notary listing house

In this project, we will be minting our own tokens to represent titles of properties. Before minting a token, we will verify the owner owns the property. We will use zk-SNARKs to create a verification system which can prove you have title to the property without revealing that specific information on the property.

PS: For educational purposes, we will actually prove that the user owns the property if he knows 2 numbers with the 1st one being the square root of the 2nd number. :-)

Once the token has been verified we will place it on a blockchain market place (OpenSea) for others to purchase. Let's get started!

# Run and deploy the projects

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
> Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 30000000 (0x1c9c380)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xa8a7602f8d3eb310b7b67ab0a301602d39fb81f8812a3537894d047e08813cd8
undefined
undefined

   Deploying 'SolnSquareVerifier'
   ------------------------------
   > transaction hash:    0xa2c74127db5350d693d52ebe5b65dab715725e6fd10698a95922864063408202
   > Blocks: 0            Seconds: 0
   > contract address:    0x1ff1A6bF50F3440383a61774d25b5C92e567192F
   > block number:        10736325
   > block timestamp:     1653461635
   > account:             0xc6696eDf5e753f5B3009608F9e25ED2cb713C7fA
   > balance:             0.299832508295488155
   > gas used:            3488291 (0x353a23)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.03488291 ETH

undefined
   > Blocks: 1            Seconds: 13
   > contract address:    0xDAc4b83BF34D08B628D4aE6AB96e4Ee3F5AfB1EB
   > block number:        10736328
   > block timestamp:     1653461634
   > account:             0xc6696eDf5e753f5B3009608F9e25ED2cb713C7fA
   > balance:             0.346165128295488155
   > gas used:            226537 (0x374e9)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00226537 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.03714828 ETH


2_deploy_contracts.js
=====================

   Deploying 'SquareVerifier'
   --------------------------
   > transaction hash:    0x47d244e5f4a00fbbc9bb70fa735813652c20d0705d4f647ffb2abfbcc2319e43
undefined
   > Blocks: 1            Seconds: 5
   > contract address:    0x4CA03921e2f14D67aD45eA09FB15fEa66dd3D29D
   > block number:        10736330
   > block timestamp:     1653461664
   > account:             0xc6696eDf5e753f5B3009608F9e25ED2cb713C7fA
   > balance:             0.335002048295488155
   > gas used:            1070545 (0x1055d1)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.01070545 ETH



   Deploying 'SolnSquareVerifier'
   ------------------------------
   > transaction hash:    0x025466405f97ac09062c74b10f9d6f80d7476e811737cd706ea1f37915530a64
undefined
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.01070545 ETH

Summary
=======
> Total deployments:   5
> Final cost:          0.06082455 ETH
```

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
