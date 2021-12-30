import { ethers } from "ethers";
import sdk from "./1-initialize-sdk";
import { readFileSync } from "fs";

const app = sdk.getAppModule("qaDAO")(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: "qaDAO",
      description: "a DAO based on asking and answering questions",
      image: readFileSync("scripts/assets/Tesseract.gif"),
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });
    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address
    );
    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata()
    );
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
});
