import { ethers } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  // Receiving parameters
  const parameters = process.argv.slice(2);
  if (!parameters || parameters.length < 2)
    throw new Error("Parameters not provided");
  const contractAddress = parameters[0];
  const proposalNumber = parameters[1];

  // Configuring the provider
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_ENDPOINT_URL ?? ""
  );
  const lastBlock = await provider.getBlock("latest");
  console.log(`Last block number: ${lastBlock?.number}`);
  const lastBlockTimestamp = lastBlock?.timestamp ?? 0;
  const lastBlockDate = new Date(lastBlockTimestamp * 1000);
  console.log(
    `Last block timestamp: ${lastBlockTimestamp} (${lastBlockDate.toLocaleDateString()} ${lastBlockDate.toLocaleTimeString()})`
  );

  // Configuring the wallet
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  console.log(`Using address ${wallet.address}`);
  const balanceBN = await provider.getBalance(wallet.address);
  const balance = Number(ethers.formatUnits(balanceBN));
  console.log(`Wallet balance ${balance} ETH`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  // Attaching the smart contract using Typechain
  const ballotFactory = new Ballot__factory(wallet);
  const ballotContract = ballotFactory.attach(contractAddress) as Ballot;

  // Before the vote, check for proposal name and vote count
  const proposalBefore = await ballotContract.proposals(proposalNumber);
  console.log(
    `Proposal name before vote: ${ethers.decodeBytes32String(
      proposalBefore.name
    )}`
  );
  console.log(`Vote count before vote: ${proposalBefore.voteCount}`);

  // Casting the vote
  const tx = await ballotContract.vote(proposalNumber);
  const receipt = await tx.wait();
  console.log(`Transaction completed: ${receipt?.hash}`);

  // After the vote, check for proposal name and vote count
  const proposalAfter = await ballotContract.proposals(proposalNumber);
  console.log(
    `Proposal name after vote: ${ethers.decodeBytes32String(
      proposalAfter.name
    )}`
  );
  console.log(`Vote count after vote: ${proposalAfter.voteCount}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
