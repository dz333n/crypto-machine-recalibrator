import { BaseAdapter, getRegisteredAdapters } from "backtest-machine";
import { symbolsWhitelist } from "./constants";
import optimizeAsset from "./optimize-asset";
import Result from "./result";
import WhitelistedSymbol from "./whitelisted-symbol";

function getWhitelistedSymbol(symbol: string): WhitelistedSymbol | undefined {
  return symbolsWhitelist.find((whitelistedSymbol) =>
    symbol.includes(whitelistedSymbol.sourceName)
  );
}

async function handleAdapterSymbol(
  adapter: BaseAdapter,
  path: string,
  symbol: string
): Promise<Result | undefined> {
  const whitelistedSymbol = getWhitelistedSymbol(symbol);

  if (!whitelistedSymbol) {
    console.log(`Skipping ${symbol} because it's not in the whitelist`);
    return;
  }

  console.log(`Loading asset ${symbol} for adapter ${adapter.id}`);
  const asset = await adapter.loadSymbol(path, symbol);

  return await optimizeAsset(whitelistedSymbol, asset);
}

async function handleAdapter(
  adapter: BaseAdapter,
  path: string
): Promise<Result[]> {
  console.log(`Loading symbols for adapter ${adapter.id}`);

  const symbols = await adapter.loadAssetSymbols(path);

  const results: Result[] = [];
  for (const symbol of symbols) {
    const result = await handleAdapterSymbol(adapter, path, symbol);

    if (result) {
      results.push(result);
    }
  }

  return results;
}

export default async function handlePath(path: string): Promise<Result[]> {
  const adapters = getRegisteredAdapters();

  const results: Result[] = [];
  for (const adapter of adapters) {
    results.push(...(await handleAdapter(adapter, path)));
  }

  return results;
}
