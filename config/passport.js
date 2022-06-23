module.exports = function (passport) {
  const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
  const GOOGLE_CLIENT_ID =
    "818740999529-7q4nn3mq8jou5rvc6rbh8sqvmq9u52rk.apps.googleusercontent.com";
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
