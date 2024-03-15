import Result from "./result";
import fs from "fs";

export default function handleResults(results: Result[]) {
  const jsonResults = JSON.stringify(results, null, 2);
  fs.writeFileSync("./sma-calibration.json", jsonResults);
}
