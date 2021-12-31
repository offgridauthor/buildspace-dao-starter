import sdk from "./1-initialize-sdk.js";

const appModule = sdk.getAppModule(
  "0xA0Fb0BA31BF7ec5327a64C6B7c0403760Ad54507",
);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      // governance contract name
      name: "qaDAO Proposals",

      //  ERC-20 contract
      votingTokenAddress: "0x0e05FA8c6dbd23841213983214528D4F2DeD64b9",

      // After a proposal is created, when can members start voting?
      proposalStartWaitTimeInSeconds: 0,

      // How long do members have to vote on a proposal when it's created?
      // Here, we set it to 24 hours (86400 seconds)
      proposalVotingTimeInSeconds: 24 * 60 * 60,

      votingQuorumFraction: 10,
      minimumNumberOfTokensNeededToPropose: "1",
    });

    console.log(
      "✅ Successfully deployed vote module, address: ",
      voteModule.address,
    );
  } catch (err) {
    console.error("Failed to deploy vote module", err);
  }
})();