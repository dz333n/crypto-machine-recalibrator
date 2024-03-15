export default function extractAssetsPath() {
  return process.argv.find((arg) => arg.startsWith('--path='))?.substring(7);
}
