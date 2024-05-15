import { Asset, fetchJob, optimizeStrategy } from "backtest-machine";
import { cursorTo, moveCursor } from "readline";
import { formatDuration } from "./format-duration";
import Result from "./result";
import WhitelistedSymbol from "./whitelisted-symbol";

function getTotalMemoryUsageInGB() {
  const memoryUsage = process.memoryUsage();
  const rssInBytes = memoryUsage.rss;
  const rssInGB = rssInBytes / 1024 ** 3;
  return rssInGB.toFixed(2) + " GB";
}

export default async function optimizeAsset(
  whitelistedSymbol: WhitelistedSymbol,
  asset: Asset
): Promise<Result> {
  console.log(`Optimizing asset ${asset.symbol}`);

  let job = await optimizeStrategy({
    assets: [asset],
    drawdownThreshold: -30,
    roiThreshold: -30,
    initialBalance: 5000,
    strategyName: "sma",
  });

  let doNotMoveCursor = true;

  while (job.status === "running") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    job = await fetchJob(job.id);

    const symbolResults = job.results[asset.symbol] || [];
    const roi = symbolResults[0]?.roi || 0;
    const progress = (
      (job.processedCombinations / job.combinationsCount) *
      100
    ).toFixed(1);
    const bestParams = symbolResults[0]?.params || [];
    const bestParamsIndexed = bestParams.reduce((acc, param) => {
      acc[param.name] = param.value;
      return acc;
    }, {} as Record<string, string>);

    const logObject = {
      "Optimizing asset": asset.symbol,
      ROI: roi.toFixed(1) + "%",
      Progress: progress + "%",
      Duration: formatDuration(job.startDate, new Date()),
      "Processed combinations": job.processedCombinations,
      "Total combinations": job.combinationsCount,
      "Memory usage": getTotalMemoryUsageInGB(),
      ...bestParamsIndexed,
    };

    if (!doNotMoveCursor) {
      const lines = Object.keys(logObject).length + 4;
      cursorTo(process.stdout, 0);
      moveCursor(process.stdout, 0, -lines);
    } else {
      doNotMoveCursor = false;
    }

    console.table(logObject);
  }

  console.log(`Optimization finished for asset ${asset.symbol}`);

  return {
    whitelistedSymbol,
    calibratedAt: new Date(),
    ...job.results[asset.symbol][0],
  };
}
