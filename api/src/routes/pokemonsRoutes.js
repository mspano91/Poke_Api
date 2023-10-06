const { Router } = require("express");
const {
  getPokemonHandler,
  getPokemonById_Handler,
  postPokemonHandler,
  deletePokemon_Handler,
  getByNav_handler,
} = require("../handlers/pokemonHandler");
const pokeRouter = Router();

pokeRouter.get("/", getPokemonHandler);
pokeRouter.get("/nav/:name", getByNav_handler);
pokeRouter.get("/:id", getPokemonById_Handler);
pokeRouter.post("/create", postPokemonHandler);
pokeRouter.delete("/delete/:id", deletePokemon_Handler);

module.exports = pokeRouter;
