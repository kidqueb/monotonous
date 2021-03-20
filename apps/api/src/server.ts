import fastify, { FastifyRequest } from "fastify";
import cookie from "fastify-cookie";
import merc from "mercurius";
import { Context } from "@monotonous/types";
import { prisma } from "@monotonous/sdk-server";

import { loaders } from "./graphql_schema/loaders";
import { schema } from "./graphql_schema";

export function createServer() {
  const server = fastify();

  server.register(cookie);

  server.register(merc, {
    context,
    schema,
    loaders,
    persistedQueryProvider: merc.persistedQueryDefaults.automatic(5000),
    allowBatchedQueries: true,
    subscription: true,
    graphiql: process.env.NODE_ENV !== "production" ? "playground" : false,
    jit: 1,
  });

  return server;
}

function context(request: FastifyRequest): Context {
  return {
    request,
    prisma,
    GqlError(message: string, extensions?: object) {
      return new merc.ErrorWithProps(message, extensions);
    },
  };
}
