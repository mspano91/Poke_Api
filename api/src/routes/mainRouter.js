const { Router } = require("express");
const pokemonsRoutes = require("./pokemonsRoutes");
const typeRoutes = require("./typesRoutes");

// Importar todos los routers; RUTAS
const mainRouter = Router();

//router paths congi
mainRouter.use("/pokemon", pokemonsRoutes);
mainRouter.use("/type", typeRoutes);

module.exports = mainRouter;
