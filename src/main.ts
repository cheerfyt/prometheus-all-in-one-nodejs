import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import json from "koa-json";
import KoaLogger from "koa-logger";
import { ProLogger } from "./logger";
import { stdSerializers } from "bunyan";
const prom = require("@echo-health/koa-prometheus-exporter");

const app = new Koa();
const router = new Router();

const logger = new ProLogger({
  name: "prometheus-logger",
  serializers: {
    error: stdSerializers.err
  }
});

const md1 = logger.toMiddleware("md1", async (ctx: any, next: Koa.Next) => {
  ctx.logger.info("this is raw logger");
  return next();
});

const md2 = logger.toMiddleware("md2", async (ctx: any, next: Koa.Next) => {
  throw new Error(`Md2 error`);
});

app.use(md1);
app.use(md2);
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
