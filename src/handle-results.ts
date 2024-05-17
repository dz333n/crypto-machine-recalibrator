import fs from "fs";
import Result from "./result";

function injectTimeframes(results: Result[]) {
  for (const result of results) {
    console.log(
      `Injecting timeframe for ${result.whitelistedSymbol.sourceName}`
    );

    result.params.push({
      name: "timeframe",
      type: "integer", // FIXME: it is not integer
      value: result.whitelistedSymbol.injectTimeframeParam,
    });
  }
}

export default function handleResults(results: Result[]) {
  injectTimeframes(results);

  const jsonResults = JSON.stringify(results, null, 2);
  fs.writeFileSync("./sma-calibration.json", jsonResults);
}
