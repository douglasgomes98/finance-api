import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

import { unauthorizedResponse } from '../responses/unauthorized-response';

export async function verifyJwt(
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return unauthorizedResponse(reply)({
      message: 'Invalid session.',
    });
  }

  done();
}
