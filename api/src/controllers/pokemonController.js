const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";

// controllers/pokemonController.js
const getPokemon = async (req, res) => {
  // Lógica para obtener un Pokémon
  try {
    const response = await axios(`${URL}`);
    const pokemonList = response.data.results;
    if (!pokemonList.length) {
      return res.status(404).send("Pokemons not found.");
    }
    // const pokemonNames = pokemonList.map((pokemon) => pokemon.name);

    return res.status(200).json(pokemonList);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getPokemon_ById = async (req, res) => {
  // Lógica para crear un Pokémon
  try {
    const { id } = req.params;
    const { data } = await axios(`${URL}/${id}`);
    const { name, height, species, weight, stats, ability, sprites } = data;

    if (name) {
      const pokemonFound = {
        name,
        height,
        species,
        weight,
        stats,
        ability,
        sprites,
      };
      return res.status(200).send(pokemonFound);
    } else {
      return res.status(404).json("this pokemon does not exist");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// Exporta las funciones para su uso en las rutas
module.exports = {
  getPokemon,
  getPokemon_ById,
};
