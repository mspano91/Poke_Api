const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon?limit=50";

// controllers/pokemonController.js
const getPokemon = async () => {
  const response = await axios(URL);
  const pokemonList = response.data.results; //accedemos a la api

  if (!pokemonList.length) {
    throw new Error("No Pokémon found in GetPokemon controller");
  }
  const pokeMap = pokemonList.map(async (el) => {
    const { data } = await axios.get(el.url);
    const typesArray = data.types.map((el) => el.type.name);
    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: typesArray,
      hp: data.stats[0]?.base_stat,
      skills: data.abilities[0]?.ability.name,
      image: data.sprites?.other?.dream_world?.front_default,
    };
  });
  return Promise.all(pokeMap);
};

//llama por id y name
const getPokemon_ById = async (id) => {
  // Lógica para traer pokemon por id
  try {
    const { data } = await axios(`${URL}/${id}`);
    const { name, height, types, weight, stats, abilities, sprites } = data;
    const typesArray = types.map((type) => type.type.name);
    if (name) {
      const pokemonFound = {
        name,
        height,
        weight,
        types: typesArray,
        hp: stats[0]?.base_stat,
        skills: abilities[0]?.ability.name,
        image: sprites?.back_default,
      };
      return pokemonFound;
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
