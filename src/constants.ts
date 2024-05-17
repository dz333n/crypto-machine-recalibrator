import { InputParam, IntegerInputParam } from "backtest-machine";
import WhitelistedSymbol from "./whitelisted-symbol";

export const symbolsWhitelist: WhitelistedSymbol[] = [
  {
    sourceName: "BTCUSDT_2h_futures",
    cryptoMachineSymbol: "BTC/USDT",
    injectTimeframeParam: "2h",
  },
  {
    sourceName: "ADAUSDT_2h_futures",
    cryptoMachineSymbol: "ADA/USDT",
    injectTimeframeParam: "2h",
  },
  {
    sourceName: "SOLUSDT_4h_futures",
    cryptoMachineSymbol: "SOL/USDT",
    injectTimeframeParam: "4h",
  },
  // { sourceName: "BNBUSDT_2h_futures", cryptoMachineSymbol: "BNB/USDT" },
  // { sourceName: "ETHUSDT_2h_futures", cryptoMachineSymbol: "ETH/USDT" },
];
