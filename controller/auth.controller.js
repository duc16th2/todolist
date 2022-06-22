class AuthController {
  async auth(req, res) {
    res.render("pages/auth");
  }
}

module.exports = new AuthController();
