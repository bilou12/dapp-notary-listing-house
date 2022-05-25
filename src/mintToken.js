const Web3 = require('web3');
const SolnSquareVerifier = require('../eth-contracts/build/contracts/SolnSquareVerifier.json');
const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');

const mnemonic = fs.readFileSync("../eth-contracts/.secret").toString().trim();
const infuraKey = fs.readFileSync("../eth-contracts/.infura-key").toString().trim();

const contractAddress = "0x6E8Cc50ACBb75ABf892B4C2eac4F8659Da94cA8B";
let tokenId = 1;

let web3 = new Web3(new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`));
console.log('web3.eth.accounts: ', web3.eth.accounts);

let soInSquareVerifier = new web3.eth.Contract(SolnSquareVerifier.abi, contractAddress);
console.log('address: ', contractAddress);

let account_owner = "0xc6696edf5e753f5b3009608f9e25ed2cb713c7fa";

const run = async () => {

    for (let tokenId = 2; tokenId <= 10; tokenId++) {
        let proof = require('../zokrates/code/square/proof' + tokenId + '.json');
        console.log('proof: ', proof);

        console.log('tokenId: ', tokenId);
        let res = await soInSquareVerifier.methods
            .mintNewNft(tokenId, account_owner, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs)
            .send({
                from: account_owner
            });
        console.log('res: ', res);
    }
}

run()