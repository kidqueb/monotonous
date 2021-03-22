import { extendType, objectType, nonNull } from "nexus";
import * as resolvers from "./user_resolvers";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("email");
    t.nonNull.boolean("confirmed");
    t.field("profile", { type: "UserProfile" });
  },
});

/**
 * Queries
 */
export const UserQuery = extendType({
  type: "Query",

  definition(t) {
    t.field("me", {
      type: "User",
      //shield: authGuard,
      resolve: resolvers.me,
    });
  },
});
