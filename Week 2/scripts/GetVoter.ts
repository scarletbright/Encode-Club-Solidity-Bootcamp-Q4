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
  const voterAddress = parameters[1];

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

  // Getting the voter information
  console.log(`Getting voter information for address ${voterAddress}:`);
  const voter = await ballotContract.voters(voterAddress);

  if (!voter) {
    throw new Error("This address is not a voter");
  }

  console.log(
    `${voterAddress} ${voter.voted ? "Has voted" : "Has not voted yet"}`
  );

  console.log(`${voterAddress} voted ${voter.vote}`);

  console.log(`${voterAddress} has a voting weight of ${voter.weight}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
