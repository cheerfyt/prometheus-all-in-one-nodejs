import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import json from "koa-json";
import KoaLogger from "koa-logger";
const prom = require("@echo-health/koa-prometheus-exporter");

const app = new Koa();
const router = new Router();

process.on("SIGQUIT", () => {
  console.log("get signal SIGQUIT, process will exit");
  process.exit();
});

process.on("SIGINT", () => {
  console.log("user send ctrl+c, process will exit");
  process.exit();
});

app.use(
  prom.middleware({
    path: "/my-metric",
  })
);
app.use(json());
app.use(KoaLogger());
app.use(bodyParser());

router.get("/", async (ctx: any) => {
  ctx.body = {
    hello: "world",
  };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(9527, () => {
  console.log(`server start @ 9527`);
});
