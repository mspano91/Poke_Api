const { Router } = require("express");
const {
  getPokemonHandler,
  getPokemonById,
  postPokemon,
} = require("../handlers/pokemonHandler");
const pokeRouter = Router();

pokeRouter.get("/", getPokemonHandler);
pokeRouter.get("/:id", getPokemonById);
// pokeRouter.get("/name?=", getPokemonByName);
pokeRouter.post("/", postPokemon);

// router.delete("/", getPokemons);
// router.put("/", getPokemons);

module.exports = pokeRouter;
