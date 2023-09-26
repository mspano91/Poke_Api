const {
  getPokemon,
  getPokemon_ById,
} = require("../controllers/pokemonController");

const getPokemonHandler = (req, res) => {
  // Lógica adicional (puede incluir validación, autenticación, etc.)
  getPokemon(req, res);
};

//aca vamos a recibir por params por que recibe por id
const getPokemonById = (req, res) => {
  getPokemon_ById(req, res);
};

const getPokemonByName = (req, res) => {
  res.status(200).send(console.log("got to the endpoint"));
};

const postPokemon = (req, res) => {
  res.status(200).send(console.log("got to the endpoint"));
};

module.exports = {
  getPokemonHandler,
  getPokemonById,
  postPokemon,
  getPokemonByName,
};
