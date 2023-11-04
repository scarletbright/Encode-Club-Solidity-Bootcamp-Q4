import { ethers } from 'ethers';
import { Ballot, Ballot__factory } from '../typechain-types';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Function to vote on a proposal
 */
async function main() {
  // Receiving parameters
  const parameters = process.argv.slice(2);
  if (!parameters || parameters.length < 2) {
    throw new Error('Parameters not provided');
  }

  // Contract address and proposal number are retrieved
  const contractAddress = parameters[0];
  const proposalNumber = parameters[1];

  // Configuring the provider
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_ENDPOINT_URL ?? ''
  );

  // Getting the last block number and timestamp
  const lastBlock = await provider.getBlock('latest');
  const lastBlockNumber = lastBlock?.number;
  const lastBlockTimestamp = lastBlock?.timestamp ?? 0;
  const lastBlockDate = new Date(lastBlockTimestamp * 1000);

  // Printing out the last block information
  console.log(`Last block number: ${lastBlockNumber}`);
  console.log(
    `Last block timestamp: ${lastBlockTimestamp} (${lastBlockDate.toLocaleDateString()} ${lastBlockDate.toLocaleTimeString()})`
  );

  // Configuring the wallet
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? '', provider);
  console.log(`Using address ${wallet.address}`);

  // Getting the balance of the wallet
  const balanceBN = await provider.getBalance(wallet.address);
  const balance = Number(ethers.formatUnits(balanceBN));
  console.log(`Wallet balance ${balance} ETH`);

  // Checking if there is enough balance to vote
  if (balance < 0.01) {
    throw new Error('Not enough ether');
  }

  // Attaching the smart contract using Typechain
  const ballotFactory = new Ballot__factory(wallet);
  const ballotContract = ballotFactory.attach(contractAddress) as Ballot;

  // Printing out the contract address
  console.log(`Contract address: ${contractAddress}`);

  // Printing out the proposal number
  console.log(`Proposal number: ${proposalNumber}`);

  // Voting on the proposal
  const tx = await ballotContract.vote(proposalNumber);

  // Waiting for the transaction to be confirmed
  const receipt = await tx.wait();

  // Printing out the transaction hash and receipt
  console.log(`Transaction hash: ${tx?.hash}`);
  console.log(`Transaction receipt: ${receipt?.hash}`);

  // Checking for any revert reason
  const revertReason = await ballotContract.revertReason();
  if (revertReason) {
    console.log(`Revert reason: ${revertReason}`);
  }
}

// Catching any errors that may occur during execution
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
