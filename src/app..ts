import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ENV } from "./environment";
import { categoryRouter } from "./http/controllers/category/router";
import { zodValidatorErrorParse } from "./http/middlewares/zod-validator-error-parse";

export const app = fastify();

app.register(fastifyJwt, {
  secret: ENV.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "15m",
  },
});

app.register(fastifyCookie);

app.register(categoryRouter, { prefix: "/api/v1/category" });

app.setErrorHandler(zodValidatorErrorParse);
