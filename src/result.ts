import { InputParam } from "backtest-machine";

export default interface Result {
  symbol: string;
  roi: number;
  params: InputParam[];
}
