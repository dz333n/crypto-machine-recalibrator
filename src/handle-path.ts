import { BaseAdapter, getRegisteredAdapters } from "backtest-machine";
import optimizeAsset from "./optimize-asset";
import Result from "./result";

const symbolsWhitelist = [
  'BTCUSDT_4h_futures',
  'ETHUSDT_4h_futures',
  'BNBUSDT_4h_futures',
];

function isSymbolWhitelisted(symbol: string): boolean {
  return symbolsWhitelist.some((whitelistedSymbol) => symbol.includes(whitelistedSymbol));
}

async function handleAdapterSymbol(adapter: BaseAdapter, path: string, symbol: string): Promise<Result | undefined> {
  if (!isSymbolWhitelisted(symbol)) {
    console.log(`Skipping ${symbol} because it's not in the whitelist`);
    return;
  }

  console.log(`Loading asset ${symbol} for adapter ${adapter.id}`);
  const asset = await adapter.loadSymbol(path, symbol);

  return await optimizeAsset(asset);
}

async function handleAdapter(adapter: BaseAdapter, path: string): Promise<Result[]> {
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
