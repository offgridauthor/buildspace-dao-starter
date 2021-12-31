import { useEffect, useMemo, useState } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useWeb3 } from "@3rdweb/hooks";

const sdk = new ThirdwebSDK("rinkeby");
const bundleDropModule = sdk.getBundleDropModule(
  "0x6e8Df43d8113ba09c25A535AA16bBEFf91371569"
);

const App = () => {
  // thirdweb's hook for connect wallet
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("👋 Address:", address);

  

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  useEffect(() => {
    if (!address) {
      return;
    }

    return bundleDropModule
      .balanceOf(address, "0")
      .then((balance) => {
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.");
        }
      })
      .catch((error) => {
        setHasClaimedNFT(false);
        console.error("failed to nft balance", error);
      });
  }, [address]);

  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to qaDAO</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="landing">
      <h1>👀 wallet connected</h1>
    </div>
  );
};

export default App;
