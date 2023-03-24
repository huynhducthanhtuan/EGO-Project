import passport from "passport";
import "./passport.js";

export const jwtGuard = passport.authenticate("jwt", { session: false });
