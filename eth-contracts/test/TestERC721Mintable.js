var ERC721MintableComplete = artifacts.require('PropertyToken');

contract('TestERC721Mintable', accounts => {

    const account_owner = accounts[0];
    const account_one = accounts[1];
    const account_two = accounts[2];

    console.log('accounts: ' + accounts);

    const COUNT_NFT = 3;

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({
                from: account_owner
            });

            // mint 3 NFTs for account_one
            for (let i = 0; i < COUNT_NFT; i++) {
                console.log("create NFT for account_one: " + i);
                await this.contract.mint(account_one, i, {
                    from: account_owner
                });
            }

            // mint 1 NFT for account_two
            console.log("create NFT for account_two: " + 4);
            await this.contract.mint(account_two, 4, {
                from: account_owner
            });
        })

        it('should return total supply', async function () {
            let totalSupply = await this.contract.totalSupply();
            assert.equal(totalSupply, COUNT_NFT + 1, "Incorrect total supply");
        })

        it('should get token balance', async function () {
            let balance = await this.contract.balanceOf(account_one, {
                from: account_owner
            });
            assert.equal(balance, COUNT_NFT, "Incorrect balance");
        })

        it('should return token uri', async function () {
            let tokenId = 1;
            let tokenUri = await this.contract.tokenURI(tokenId, {
                from: account_owner
            });
            assert.equal(tokenUri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "tokenUri is invalid");
        })

        it('should transfer token from one owner to another', async function () {
            let tokenId = 1;
            let tokenOwner = await this.contract.ownerOf(tokenId);
            console.log("owner: " + tokenOwner);
            await this.contract.transferFrom(tokenOwner, account_two, tokenId, {
                from: tokenOwner
            });

            let newOwner = await this.contract.ownerOf(tokenId);

            assert.equal(newOwner, account_two, "transferFrom failed");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({
                from: account_owner
            });
        })

        it('should fail when minting when address is not contract owner', async function () {
            let tokenId = 999;

            let contractOwner = await this.contract.getOwner();
            assert.notEqual(contractOwner, account_one, "account_one is the contract owner");

            err = false;
            try {
                await this.contract.mint(account_one, tokenId, {
                    from: account_one
                });
            } catch {
                err = true;
            }
            assert.equal(err, true, "mint did not throw an error as expected");
        })

        it('should return contract owner', async function () {
            let contractOwner = await this.contract.getOwner();
            assert.equal(contractOwner, account_owner, "account_owner does not match");
        })
    });
})