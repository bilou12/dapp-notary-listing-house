// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var ZokratesSquareVerifier = artifacts.require("Verifier")


// - use the contents from proof.json generated from zokrates steps
contract('ZokratesSquareVerifier', accounts => {
    const account_owner = accounts[0];

    // Test verification with correct proof
    let proof = require('../../zokrates/code/square/proof');

    beforeEach(async () => {
        this.contract = await ZokratesSquareVerifier.new({
            from: account_owner
        });
    })

    it('should work with correct proof', async () => {
        let inputs = proof.inputs;

        let res = await this.contract.verifyTx(proof.proof.a, proof.proof.b, proof.proof.c, inputs);

        assert.equal(res, true, "res should be true");
    })

    // Test verification with incorrect proof
    it('should fail with incorrect proof', async () => {
        let inputs = [10, 2];

        let res = await this.contract.verifyTx(proof.proof.a, proof.proof.b, proof.proof.c, inputs);

        assert.equal(res, false, "res should be false");
    })
})