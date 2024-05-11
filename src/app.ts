import extractAssetsPath from "./extract-assets-path";
import handlePath from "./handle-path";
import handleResults from "./handle-results";
import redownloadBinanceAssets from "./redownload-binance-assets";

async function main() {
  const assetsPath = extractAssetsPath();

  if (!assetsPath) {
    throw new Error(
      "Provide a path to the updated backtest-machine-assets repository using the --path=PATH flag"
    );
  }

  await redownloadBinanceAssets(assetsPath);

  const results = await handlePath(assetsPath);
  handleResults(results);
}

main();
