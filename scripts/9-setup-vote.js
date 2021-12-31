import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule(
  "0xb3493F8489D17B286160dd5421c282677b7E4fE6",
);

const tokenModule = sdk.getTokenModule(
  "0x0e05FA8c6dbd23841213983214528D4F2DeD64b9",
);

(async () => {
  try {
    // Give our treasury the power to mint additional tokens if needed.
    await tokenModule.grantRole("minter", voteModule.address);

    console.log(
      "Successfully gave vote module permissions to act on token module"
    );
  } catch (error) {
    console.error(
      "failed to grant vote module permissions on token module",
      error
    );
    process.exit(1);
  }

  try {
    // pivot from dictatorship
    const ownedTokenBalance = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );

    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent80 = ownedAmount.div(100).mul(80);

    await tokenModule.transfer(
      voteModule.address,
      percent80
    );

    console.log("✅ Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("failed to transfer tokens to vote module", err);
  }
})();
