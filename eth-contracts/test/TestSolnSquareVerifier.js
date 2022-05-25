var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
var SquareVerifier = artifacts.require("SquareVerifier");

contract('SolnSquareVerifier', (accounts) => {
    const account_owner = accounts[0];
    const account_one = accounts[1];

    let proof = require('../../zokrates/code/square/proof');

    beforeEach(async () => {
        this.contractSquareVerifier = await SquareVerifier.new({
            from: account_owner
        })
        this.contract = await SolnSquareVerifier.new(this.contractSquareVerifier.address, {
            from: account_owner
        });
    })

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it('can add a new solution (caught by the event SolutionAdded)', async () => {
        let tokenId = 1;
        let inputs = proof.inputs;

        let eventSolutionAddedEmitted = false;

        // arrange: watch the event SolutionAdded
        await this.contract.getPastEvents('SolutionAdded', {
            fromBlock: 'latest'
        }).then((res) => {
            console.log('SolutionAdded: ' + res);
            eventSolutionAddedEmitted = true;
        });

        // act: call the mintNewNft function
        await this.contract.mintNewNft(tokenId, account_one, proof.proof.a, proof.proof.b, proof.proof.c, inputs);

        // assert
        assert.equal(eventSolutionAddedEmitted, true, "The event SOlutionAdded has not been emitted")
    })

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('can mint a new ERC721 token', async () => {
        let tokenId = 2
        let inputs = proof.inputs;

        let totalSupply = null;

        // arrange: make sure initially the totalSyupply is equal to 0
        totalSupply = await this.contract.totalSupply();
        assert.equal(totalSupply, 0, "Incorrect total supply");

        // act
        await this.contract.mintNewNft(tokenId, account_one, proof.proof.a, proof.proof.b, proof.proof.c, inputs);

        // assert: check if the totalSupply has moved from 0 to 1
        totalSupply = await this.contract.totalSupply();
        assert.equal(totalSupply, 1, "Incorrect total supply");
    })
})