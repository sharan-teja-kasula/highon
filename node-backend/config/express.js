const express = require("express");

const cors = require("cors");

const compression = require("compression");

const routeValidator = require("./express_config/routes.validator");

const routesLoader = require("./express_config/routes.loader");

module.exports = function (app) {
  const corsOptions = {
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };

  app.use(cors(corsOptions));

  app.use(compression());

  app.use(express.text({ limit: "10mb", extended: false }));

  app.use(express.json({ limit: "10mb", extended: false }));

  app.use(express.urlencoded({ limit: "10mb", extended: false }));

  app.use((req, res, next) => routeValidator.routeHandler(req, res, next));

  routesLoader.loadAppRoutes(app);
};
