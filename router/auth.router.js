const router = require("express").Router();
const passport = require("passport");
const authController = require("../controller/auth.controller");

router.get("", authController.auth);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    res.redirect("/todos");
  }
);

router.get("/logout", async (req, res) => {
  res.redirect("/");
});
module.exports = router;
