import { FastifyInstance } from "fastify";
import { createCategory } from "./create-category";

export async function categoryRouter(app: FastifyInstance) {
  app.post("/", createCategory);
}
