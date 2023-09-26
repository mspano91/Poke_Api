const { Router } = require("express");
const pokemonsRoutes = require("./pokemonsRoutes");
const getTypes = require("./typesRoutes");

// Importar todos los routers; RUTAS
const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

mainRouter.use("/pokemon", pokemonsRoutes);
mainRouter.use("/types", getTypes);

module.exports = mainRouter;
