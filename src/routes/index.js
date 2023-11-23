const { Router } = require("express");
const tagsRoutes = require("./tags.routes");

const routes = Router();
routes.use("/api/tags", tagsRoutes);

module.exports = routes;
