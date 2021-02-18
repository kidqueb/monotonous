import fastify, { FastifyRequest } from 'fastify';
import merc from 'mercurius';
import { CustomContext } from '@monotonous/types';
import { prisma } from '@monotonous/sdk-server';

import { schema } from './graphql_schema';

export function createServer() {
  const server = fastify();

  server.register(merc, {
    context,
    schema,
    persistedQueryProvider: merc.persistedQueryDefaults.automatic(5000),
    allowBatchedQueries: true,
    subscription: true,
    graphiql: process.env.NODE_ENV !== 'production' ? 'playground' : false,
    jit: 1,
  });

  return server;
}

function context(request: FastifyRequest): CustomContext {
  return {
    request,
    prisma,
    GqlError(message: string, extensions?: object) {
      return new merc.ErrorWithProps(message, extensions);
    },
  };
}
