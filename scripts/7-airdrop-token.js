import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is the address to our ERC-1155 membership NFT contract.
const bundleDropModule = sdk.getBundleDropModule(
  "0x6e8Df43d8113ba09c25A535AA16bBEFf91371569",
);

// This is the address to our ERC-20 token contract.
const tokenModule = sdk.getTokenModule(
  "0x0e05FA8c6dbd23841213983214528D4F2DeD64b9",
);

(async () => {
  try {
    const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");
  
    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
      );
      process.exit(0);
    }
    
    const airdropTargets = walletAddresses.map((address) => {
      const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      console.log("✅ Going to airdrop", randomAmount, "tokens to", address);
      
      const airdropTarget = {
        address,
        amount: ethers.utils.parseUnits(randomAmount.toString(), 18),
      };
  
      return airdropTarget;
    });
    
    console.log("🌈 Starting airdrop...")
    await tokenModule.transferBatch(airdropTargets);
    console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();