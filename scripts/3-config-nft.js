import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x6e8Df43d8113ba09c25A535AA16bBEFf91371569"
);
(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Toga of Socrates",
        description: "This NFT grants membership rights to qaDAO",
        image: readFileSync("scripts/assets/toga.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
