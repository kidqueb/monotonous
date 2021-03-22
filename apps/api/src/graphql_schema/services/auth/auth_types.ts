import { extendType, inputObjectType, nonNull } from "nexus";
import * as resolvers from "./auth_resolvers";

export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("register", {
      type: "User",
      args: {
        email: nonNull("String"),
        firstName: nonNull("String"),
        lastName: nonNull("String"),
      },
      resolve: resolvers.register,
    });

    t.field("confirmEmail", {
      type: "User",
      args: {
        token: nonNull("String"),
        email: nonNull("String"),
      },
      resolve: resolvers.confirmEmail,
    });

    t.field("requestLogin", {
      type: "SuccessResponse",
      args: {
        email: nonNull("String"),
      },
      resolve: resolvers.requestLogin,
    });

    t.field("login", {
      type: "User",
      args: {
        code: nonNull("String"),
      },
      resolve: resolvers.login,
    });
  },
});

export const RegisterInput = inputObjectType({
  name: "RegisterInput",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("firstName");
    t.nonNull.string("lastName");
  },
});
