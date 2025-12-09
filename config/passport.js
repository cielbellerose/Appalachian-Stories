import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { findUserById, findUserByUsername } from "../models/users";

const strategy = new LocalStrategy(
  { usernameField: "username", passwordField: "password" },
  async (username, password, done) => {
    try {
      console.log("Passport: Looking for user:", username);
      const user = await findUserByUsername(username);
      console.log("Passport: Found user:", user ? "Yes" : "No");
      if (!user) {
        console.log("Passport: User not found");
        return done(null, false, { message: "User or password incorrect" });
      }
      console.log("Passport: Comparing password");

      const isValidPassword = await bcrypt.compare(password, user.passwordHash);

      if (!isValidPassword) {
        console.log("Passport: Password incorrect");
        return done(null, false, { message: "User or password incorrect" });
      }
      console.log("Passport: Authentication successful");

      const userNoPass = { ...user };
      delete userNoPass.passwordHash;
      return done(null, userNoPass);
    } catch (error) {
      console.error("Passport: Error:", error);
      done(error);
    }
  }
);

passport.use(strategy);

// Serialize user (what to store in session)
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    if (user) {
      delete user.passwordHash;
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
