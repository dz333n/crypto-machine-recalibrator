import extractAssetsPath from "./extract-assets-path";
import { formatDuration } from "./format-duration";
import handlePath from "./handle-path";
import handleResults from "./handle-results";
import redownloadBinanceAssets from "./redownload-binance-assets";

async function benchmarked(fn: () => void) {
  const startDate = new Date();

  await fn();

  const endDate = new Date();
  console.log(`Started at ${startDate.toLocaleString()}`);
  console.log(`Ended at ${endDate.toLocaleString()}`);
  console.log(`Duration ${formatDuration(startDate, endDate)}`);
}

async function main() {
  const assetsPath = extractAssetsPath();

  if (!assetsPath) {
    throw new Error(
      "Provide a path to the updated backtest-machine-assets repository using the --path=PATH flag"
    );
  }

  await benchmarked(async () => {
    await redownloadBinanceAssets(assetsPath);

    const results = await handlePath(assetsPath);
    handleResults(results);
  });
}

main();
