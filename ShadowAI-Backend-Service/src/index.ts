import ExpressServer from "./server";

(async () => {
  await new ExpressServer().startExpressServer();
})();
