import fastify from "fastify";
import cookie from "fastify-cookie";
import merc from "mercurius";
import { AuthService, prisma, redis } from "@monotonous/sdk-server";
import { Logger } from "pino";

import { loaders } from "./graphql_schema/loaders";
import { schema } from "./graphql_schema";
import { config } from "@monotonous/conf";
import { PrismaClient } from ".prisma/client";
import { CustomContext } from "./graphql_schema/custom_context";

export function createServer(params: { prisma: PrismaClient; logger: Logger }) {
  const server = fastify();

  server.register(cookie);

  server.register(merc, {
    async context(request, reply): Promise<CustomContext> {
      const cookie = reply.cookie[config.auth.cookiePrefix];
      const claims = await AuthService.verifyJwt(cookie);

      const currentUser = await params.prisma.user.findFirst({
        where: { id: claims?.userId },
      });

      return {
        request,
        currentUser,
        logger: params.logger,
        prisma: params.prisma,
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

  server.addHook("onClose", async (_instance, done) => {
    await prisma.$disconnect();
    await redis.quit();
    done();
  });

  return server;
}
