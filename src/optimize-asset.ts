import { Asset, fetchJob, optimizeStrategy } from "backtest-machine";
import Result from "./result";

export default async function optimizeAsset(asset: Asset): Promise<Result> {
  console.log(`Optimizing asset ${asset.symbol}`);

  let job = await optimizeStrategy({
    assets: [asset],
    drawdownThreshold: -30,
    roiThreshold: -30,
    initialBalance: 5000,
    strategyName: 'sma',
  });

  while (job.status === 'running') {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    job = await fetchJob(job.id);

    const symbolResults = job.results[asset.symbol] || [];
    const roi = symbolResults[0]?.roi || 0;
    const progress = ((job.processedCombinations / job.combinationsCount) * 100).toFixed(1);

    console.log(`Optimizing asset ${asset.symbol}\tROI: ${roi.toFixed(1)}%\tProgress: ${progress}%`);
  }

  console.log(`Optimization finished for asset ${asset.symbol}`);

  return {
    symbol: asset.symbol,
    roi: job.results[asset.symbol][0].roi,
    params: job.results[asset.symbol][0].params,
  };
}
