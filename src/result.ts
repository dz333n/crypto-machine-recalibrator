import { InputParam } from "backtest-machine";
import WhitelistedSymbol from "./whitelisted-symbol";

export default interface Result {
  whitelistedSymbol: WhitelistedSymbol;
  roi: number;
  params: InputParam[];
  calibratedAt: Date;
}
