const authRoutes = require("../../src/routes/auth");
const postRoutes = require("../../src/routes/post");

const that = {};

const baseSecurityUrl = "/api";

that.loadAppRoutes = (app) => {
  app.use("/authentication", authRoutes);
  app.use(baseSecurityUrl + "/post", postRoutes);
};

module.exports = that;
