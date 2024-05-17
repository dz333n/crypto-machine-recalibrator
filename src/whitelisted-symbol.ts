import { InputParam } from "backtest-machine";

export default interface WhitelistedSymbol {
  sourceName: string;
  cryptoMachineSymbol: string;
  injectTimeframeParam: string;
}
