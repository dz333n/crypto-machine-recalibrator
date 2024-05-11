import { exec } from "child_process";

export default async function redownloadBinanceAssets(path: string) {
  const command = `python ${path}/binance-downloader.py 4h`;

  console.log(`Executing command: ${command}`);

  return new Promise<void>((resolve, reject) => {
    exec(command, { cwd: path }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        reject(error.message);
      }

      if (stderr) {
        console.error(`Command execution returned an error: ${stderr}`);
        reject(stderr);
      }

      console.log(`Command executed successfully: ${stdout}`);
      resolve();
    });
  });
}
