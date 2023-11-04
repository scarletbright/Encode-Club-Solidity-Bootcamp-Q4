import { ethers } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

async function main() {
  // Get the contract address from command line arguments
  const parameters = process.argv.slice(2);
  if (!parameters || parameters.length < 1)
    throw new Error("Parameters not provided");
  const contractAddress = parameters[0];

  // Create a provider using the RPC endpoint URL from environment variables
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_ENDPOINT_URL ?? ""
  );

  // Create a wallet using the private key from environment variables and connect it to the provider
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

  // Create a factory for the Ballot contract using the connected wallet
  const ballotFactory = new Ballot__factory(wallet);

  // Use the factory to attach to an existing Ballot contract at the given address
  const ballotContract = ballotFactory.attach(contractAddress) as Ballot;

  // Query the winningProposal function from the contract
  const winningproposal = await ballotContract.winningProposal();

  // Query the winnerName function from the contract and decode the result from bytes32 to string
  const winnername = ethers.decodeBytes32String(
    await ballotContract.winnerName()
  );

  // Query the chairperson address from the contract
  const chairperson = await ballotContract.chairperson();

  // Log the results
  console.log(`Chairperson: ${chairperson}`);
  console.log(`Winning Proposal: ${winningproposal}`);
  console.log(`Winner Name: ${winnername}`);
}

// Execute the main function and handle any errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
