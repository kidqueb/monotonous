import fastify, { FastifyRequest } from "fastify";
import cookie from "fastify-cookie";
import merc from "mercurius";
import { Context } from "@monotonous/types";
import { AuthService, prisma } from "@monotonous/sdk-server";

import { loaders } from "./graphql_schema/loaders";
import { schema } from "./graphql_schema";
import { config } from "@monotonous/conf";
import { User, UserProfile } from ".prisma/client";

export function createServer() {
  const server = fastify();

  server.register(cookie);

  server.register(merc, {
    async context(request, reply) {
      const cookie = reply.cookie[config.auth.cookiePrefix];
      const claims = await AuthService.verifyJwt(cookie);

      const currentUser = await prisma.user.findFirst({
        where: { id: claims?.userId },
      });

      return {
        request,
        currentUser,
        prisma,
        GqlError(message: string, extensions?: object) {
          return new merc.ErrorWithProps(message, extensions);
        },
      };
    },
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
