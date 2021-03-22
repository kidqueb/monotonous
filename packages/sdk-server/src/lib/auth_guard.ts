import { ruleType } from "nexus-shield";

export const authGuard = ruleType({
  resolve: (_root, _args, { currentUser, GqlError }) => {
    const allowed = Boolean(currentUser);
    if (!allowed) throw GqlError("Bearer token required");
    return allowed;
  },
});
