call build_lib.cmd
Set NODE_OPTIONS="--max-old-space-size=31744"
call yarn ts-node ./src/app.ts --path=C:\Users\yanet\Documents\backtest-machine\assets
