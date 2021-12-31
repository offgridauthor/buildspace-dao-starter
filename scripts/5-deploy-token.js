import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0xA0Fb0BA31BF7ec5327a64C6B7c0403760Ad54507");

(async () => {
  try {
    const tokenModule = await app.deployTokenModule({
      name: "qaDAO Governance Token",
      symbol: "socraDAO",
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenModule.address,
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();