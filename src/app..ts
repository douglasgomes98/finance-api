import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ENV } from "./environment";
import { categoriesRoutes } from "./http/controllers/categories/routes";
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

app.register(categoriesRoutes, { prefix: "/api/v1/categories" });

app.setErrorHandler(zodValidatorErrorParse);
