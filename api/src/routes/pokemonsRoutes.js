const { Router } = require("express");
const {
  getPokemonHandler,
  getPokemonById_Handler,
  postPokemonHandler,
} = require("../handlers/pokemonHandler");
const pokeRouter = Router();

pokeRouter.get("/", getPokemonHandler);
pokeRouter.get("/:id", getPokemonById_Handler);
pokeRouter.post("/create", postPokemonHandler);

// router.delete("/", getPokemons);
// router.put("/", getPokemons);

module.exports = pokeRouter;
