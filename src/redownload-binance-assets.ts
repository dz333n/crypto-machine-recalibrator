import { symbolsWhitelist } from "./constants";
import executeSystemCommand from "./execute-system-command";

export default async function redownloadBinanceAssets(path: string) {
  const timeframes = symbolsWhitelist.map(
    (symbol) => symbol.injectTimeframeParam
  );
  const uniqueTimeframes = [...new Set(timeframes)];

  const commands = uniqueTimeframes.map(
    (timeframe) => `python ${path}/binance-downloader.py ${timeframe}`
  );

  const promises = commands.map((command) =>
    executeSystemCommand({ cwd: path, command })
  );

  await Promise.all(promises);
}
