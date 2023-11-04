# Team 8 Homework 1

## Tasks:

### This is a group activity for at least 3 students:

* Develop and run scripts for “Ballot.sol” within your group to give voting rights, casting votes, delegating votes and querying results
* Write a report with each function execution and the transaction hash, if successful, or the revert reason, if failed
* Submit your code in a github repository in the form

### Scripts:

* **DeployWithEthers.ts**
This script deploys the contract, the arguments are propsals. For example:

```bun ts-node scripts/DeployWithEthers.ts Proposal_1 Proposal_2 Proposal_3```
Sample output:
```Deploying Ballot contract
Proposals: 
Proposal N. 1: Proposal_1
Proposal N. 2: Proposal_2
Proposal N. 3: Proposal_3
Last block number: 4630388
Last block timestamp: 1699126008 (11/4/2023 4:26:48 PM)
Using address 0xEfB02F2ae2f725E1f53878258Ab3B121FEAFe8f3
Wallet balance 1.4887249238610725 ETH
Contract deployed to 0xf7E7d7dEF551A7C16AA4Baf3caCC1A5D1B3B9060```
```

* **CastVote.ts**
This script casts a voteand takes two arguments: the address of the voting contract and the proposal number. For example:
```bun ts-node scripts/CastVote.ts 0xf7E7d7dEF551A7C16AA4Baf3caCC1A5D1B3B9060 1```
Sample output:
```
Last block number: 4630398
Last block timestamp: 1699126152 (11/4/2023 4:29:12 PM)
Using address 0xEfB02F2ae2f725E1f53878258Ab3B121FEAFe8f3
Wallet balance 1.487596191849785 ETH
Proposal name before vote: Proposal_2
Vote count before vote: 0
Transaction completed: 0xa643f29c0762438f71b86468db927d9e0797089e6adde0cfd35436e819c26b7a
Proposal name after vote: Proposal_2
Vote count after vote: 1
```

* **GetProposals.ts**
This script is used to retrieve and print out proposal details from the Ballot smart contract. It requires one parameter - the address of the deployed Ballot contract:

```bun ts-node scripts/GetProposals.ts 0xf7E7d7dEF551A7C16AA4Baf3caCC1A5D1B3B9060```
Sample output:
```
Last block number: 4630436
Last block timestamp: 1699126644 (11/4/2023 4:37:24 PM)
Using address 0xEfB02F2ae2f725E1f53878258Ab3B121FEAFe8f3
Wallet balance 1.487503276848949 ETH
Contract address: 0xf7E7d7dEF551A7C16AA4Baf3caCC1A5D1B3B9060
Proposal 0 Proposal_1
Proposal 1 Proposal_2
Proposal 2 Proposal_3
```
