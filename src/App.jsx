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

  //allows signing blockchain tx
  const signer = provider ? provider.getSigner() : undefined

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  const [isClaiming, setIsClaiming] = useState(false)

  // pass signer to sdk to enable contract interaction
  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer]) 

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
  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>DAO Member Page</h1>
        <p>Congratulations on being a member</p>
      </div>
    );
  };

  const mintNft = () => {
    setIsClaiming(true)
    bundleDropModule
    .claim("0", 1)
    .then(() => {
      setHasClaimedNFT(true)
      console.log( `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`)
    })
    .catch((err) => {
      console.error("failed to claim", err)
    })
    .finally(() => {
      setIsClaiming(false)
    })
  }

  return (
    <div className="mint-nft">
      <h1>Mint your free qaDAO Membership NFT</h1>
      <button
        disabled={isClaiming}
        onClick={() => mintNft()}
      >
        {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
      </button>
    </div>
  );

  // return (
  //   <div className="landing">
  //     <h1>👀 wallet connected</h1>
  //   </div>
  // );
};

export default App;
