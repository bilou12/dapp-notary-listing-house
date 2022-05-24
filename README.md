# Dapp notary listing house

In this project, we will be minting our own tokens to represent titles of properties. Before minting a token, we will verify the owner owns the property. We will use zk-SNARKs to create a verification system which can prove you have title to the property without revealing that specific information on the property. The basics on zk-SNARKs has been covered in Privacy lesson in Course 5 of the Udacity Blockchain Engineer Nanodegree Program.

Once the token has been verified we will place it on a blockchain market place (OpenSea) for others to purchase. Let's get started!

# Run the projects

## Zokrates

```bash
docker run -v <path to your project folder>:/home/zokrates/code -ti zokrates/zokrates /bin/bash
```

```bash
zokrates compile -i /home/zokrates/code/square/square.code

zokrates setup

zokrates compute-witness -a 3 9

zokrates generate-proof

zokrates export-verifier
```

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
