const { Router } = require("express");

const pokemonsRoutes = require("./pokemonsRoutes");
const typeRoutes = require("./typesRoutes");

// router initializated
const mainRouter = Router();

//router paths moduls
mainRouter.use("/pokemon", pokemonsRoutes);
mainRouter.use("/type", typeRoutes);

module.exports = mainRouter;
