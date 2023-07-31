const tokenDecrypt = require("../../src/services/external/jwt");

let that = {};

that.routeHandler = (req, res, next) => {
  if (!req.url.includes("/api")) {
    next();
  } else {
    that.requestValidator(req, res, next);
  }
};

that.requestValidator = async (req, res, next) => {
  try {
    if (req.headers["authorization"]) {
      let token = req.headers["authorization"];

      if (!token) return res.status(401).send({ msg: "Unauthorized Access!" });

      const decodedInfo = tokenDecrypt.decryptToken(token);
      req.user = decodedInfo;
      next();
    } else if (req.query["token"]) {
      let token = req.query["token"];

      if (!token) return res.status(401).send({ msg: "Unauthorized Access!" });

      const decodedInfo = tokenDecrypt.decryptToken(token);
      req.user = decodedInfo;
      next();
    } else {
      res.status(401).send({ msg: "Unauthorized Access!" });
    }
  } catch (e) {
    res.status(401).send({ msg: "Unauthorized Access!" });
  }
};

module.exports = that;
