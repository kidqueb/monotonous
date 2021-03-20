import { AuthService } from "@monotonous/sdk-server";
import { FieldResolver } from "nexus";
import { config } from "@monotonous/conf";

/**
 * @see Query
 * @name me
 * Query data for the currently logged in user;
 */
export const me: FieldResolver<"Query", "me"> = async (
  _source,
  _args,
  { prisma, request, GqlError }
) => {
  try {
    const cookie = request.cookies[config.auth.cookiePrefix];
    const { userId } = await AuthService.verifyJwt(cookie);

    return prisma.user.findFirst({
      where: {
        id: userId,
        confirmed: true,
      },
    });
  } catch (e) {
    throw GqlError("Unauthorized");
  }
};
