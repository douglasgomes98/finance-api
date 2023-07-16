import { FastifyInstance } from "fastify";
import { createUser } from "./create-user";

export async function userRouter(app: FastifyInstance) {
  app.post("/", createUser);
}
