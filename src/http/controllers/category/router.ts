import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { create } from "./create";
import { update } from "./update";

export async function categoryRouter(app: FastifyInstance) {
  app.post(
    "/",
    // {
    //   preHandler: [verifyJwt],
    // },
    create
  );

  app.put(
    "/:id",
    // {
    //   preHandler: [verifyJwt],
    // },
    update
  );
}
