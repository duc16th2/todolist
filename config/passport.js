module.exports = function (passport) {
  const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
  const GOOGLE_CLIENT_ID =
    "818740999529-mghl7g4lmfc89dhdf8f73r3n9ompnoqk.apps.googleusercontent.com";
  const GOOGLE_CLIENT_SECRET = "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";
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }
    )
  );

  passport.serializeUser(function (user, callback) {
    callback(null, user);
  });

  passport.deserializeUser(function (obj, callback) {
    callback(null, obj);
  });
};
