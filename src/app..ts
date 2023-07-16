import fastify from 'fastify';

import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';

import { ENV } from './environment';
import { categoryRouter } from './http/controllers/category/router';
import { userRouter } from './http/controllers/user/router';
import { errorParser } from './http/middlewares/error-parser';

export const app = fastify();

app.register(fastifyJwt, {
  secret: ENV.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '15m',
  },
});

app.register(fastifyCookie);

app.register(categoryRouter, { prefix: '/api/v1/category' });
app.register(userRouter, { prefix: '/api/v1/user' });

app.setErrorHandler(errorParser);
