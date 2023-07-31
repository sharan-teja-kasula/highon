const express = require("express");

const router = express.Router();

const jwt = require("../services/external/jwt");

const userController = require("../controllers/user");

const { logError } = require("../services/external/winston-logger");

router.post("/login", async (req, res) => {
  try {
    const { accessToken } = req.body;

    const user = await userController.getUserDetailsByGoogleToken(accessToken);

    if (!user?.verified_email)
      return res.status(422).send({
        msg: "Verify your email and try again!",
      });

    const isUserRegistered = await userController.checkEmail(user?.email);

    const { given_name, family_name, name, email, picture } = user;

    const newUser = {
      firstName: given_name,
      lastName: family_name,
      displayName: name,
      email,
      picture,
    };

    if (!isUserRegistered) {
      const user = await userController.saveUser(newUser);
      if (!user) return res.status(500).send({ msg: "Something went wrong!" });
    }

    const token = jwt.generateToken(newUser);

    return res.status(200).send({ user: newUser, token });
  } catch (err) {
    logError("auth.js", "/login", "POST", {}, err);
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

module.exports = router;
