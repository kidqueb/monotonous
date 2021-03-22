import { FieldResolver } from "nexus";
import { nanoid } from "nanoid";
import { config } from "@monotonous/conf";
import { EmailQueue, redis, logger, AuthService } from "@monotonous/sdk-server";

/**
 * @see Mutation
 * @name register
 * Create a user and user profile.
 * Send them an email to confirm their email.
 */
export const register: FieldResolver<"Mutation", "register"> = async (
  _source,
  { email, firstName, lastName },
  { prisma }
) => {
  const token = nanoid(32);

  const user = await prisma.user.create({
    data: {
      email,
      profile: {
        create: {
          firstName,
          lastName,
        },
      },
      emailConfirmation: {
        create: { token },
      },
    },
  });

  await EmailQueue.queueEmailConfirmation({
    to: email,
    token,
    firstName,
    lastName,
  });

  return user;
};

/**
 * @see Mutation
 * @name confirmEmail
 * Confirm a users email and update their profile if they change anything.
 */
export const confirmEmail: FieldResolver<"Mutation", "confirmEmail"> = async (
  _source,
  { token, email },
  { reply, prisma, GqlError }
) => {
  const confirmation = await prisma.emailConfirmation.findFirst({
    where: { token },
    include: { user: true },
  });

  if (!confirmation || confirmation.user.email !== email) {
    throw GqlError("Invalid token");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: confirmation.userId,
    },
    data: {
      confirmed: true,
    },
  });

  const jwt = await AuthService.signJwt(updatedUser.id);

  reply.setCookie(config.auth.cookiePrefix, jwt, {
    httpOnly: true,
    expires: new Date(config.auth.expires),
  });

  return updatedUser;
};

/**
 * @see Mutation
 * @name requestLogin
 * Request an email be sent with a token to log the user in.
 */
export const requestLogin: FieldResolver<"Mutation", "requestLogin"> = async (
  _source,
  { email },
  { prisma, GqlError }
) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    throw GqlError("Invalid email");
  }

  const code = await AuthService.assignOtp(user.id);

  // TODO - send login token email
  logger.debug({ emailName: "login code", code });

  return { success: true };
};

/**
 * @see Mutation
 * @name login
 * Log a user in with the token that was emailed to them.
 */
export const login: FieldResolver<"Mutation", "login"> = async (
  _source,
  { code },
  { reply, prisma, GqlError }
) => {
  const id = await redis.get(code);

  if (!id) {
    throw GqlError("Invalid token");
  }

  await redis.del(code);

  const user = await prisma.user.findFirst({
    where: { id },
  });

  if (!user) {
    throw GqlError("User doesn't exist");
  }

  const jwt = await AuthService.signJwt(user.id);

  reply.setCookie(config.auth.cookiePrefix, jwt, {
    httpOnly: true,
    expires: new Date(config.auth.expires),
  });

  return user;
};
