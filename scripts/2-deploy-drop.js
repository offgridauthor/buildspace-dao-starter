import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0xA0Fb0BA31BF7ec5327a64C6B7c0403760Ad54507");

(async () => {
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
})();
