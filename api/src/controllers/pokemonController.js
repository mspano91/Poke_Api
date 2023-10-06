const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";
const { Pokemon, Type } = require("../db");

// controllers/pokemonController.js
const getPokemon = async () => {
  const response = await axios(`${URL}?limit=50`);
  const pokemonList = response.data.results; //accedemos a la api

  if (!pokemonList.length) {
    throw new Error("No Pokémon found in GetPokemon controller");
  }

  const pokeMap = pokemonList.map(async (el) => {
    const { data } = await axios.get(el.url);
    const typesArray = data.types.map((el) => ({ name: el.type.name }));
    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: typesArray,
      hp: data.stats[0]?.base_stat,
      skills: data.abilities[0]?.ability.name,
      image: data.sprites?.other["official-artwork"]["front_default"],
    };
  });
  return Promise.all(pokeMap);
};

//llama por id y name
const getPokemon_ById = async (id) => {
  // Lógica para traer pokemon por id
  try {
    const { data } = await axios(`${URL}/${id}`);
    const {
      id: dataId,
      name,
      height,
      types,
      weight,
      stats,
      abilities,
      sprites,
      speed,
      defense,
      attack,
    } = data;
    const typesArray = types.map((type) => ({ name: type.type.name }));
    if (name) {
      const pokemonFound = {
        id: dataId,
        name,
        height,
        weight,
        types: typesArray,
        hp: stats[0]?.base_stat,
        skills: abilities[0]?.ability.name,
        image: sprites?.other["official-artwork"]["front_default"],
        speed: stats[5]?.base_stat,
        defense: stats[2]?.base_stat,
        attack: stats[1]?.base_stat,
      };
      return pokemonFound;
    } else {
      return res.status(404).json("this pokemon does not exist");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getPokemon_ByName = async (name) => {
  // Lógica para traer pokemon por id
  try {
    const { data } = await axios(`${URL}/${name.toLowerCase()}`);
    console.log(data);
    const {
      id,
      name: dataName,
      height,
      types,
      weight,
      stats,
      abilities,
      sprites,
      speed,
      defense,
      attack,
    } = data;
    const typesArray = types.map((type) => ({ name: type.type.name }));
    if (name) {
      const pokemonFound = {
        id,
        name: dataName,
        height,
        weight,
        types: typesArray,
        hp: stats[0]?.base_stat,
        skills: abilities[0]?.ability.name,
        image: sprites?.other["official-artwork"]["front_default"],
        speed: stats[5]?.base_stat,
        defense: stats[2]?.base_stat,
        attack: stats[1]?.base_stat,
      };
      return pokemonFound;
    } else {
      return res.status(404).json("this pokemon does not exist");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createNewPokemon = async (data) => {
  try {
    const pokemonObj = {
      name: data.name.toLowerCase(),
      height: data.height,
      weight: data.weight,
      hp: data.hp,
      skills: data.skills,
      image: data.image,
      speed: data.speed,
      defense: data.defense,
      attack: data.attack,
    };
    const newPokemon = await Pokemon.create(pokemonObj);
    await newPokemon.addTypes(data.type);
    await newPokemon.save();
    const pokemonCreated = await Pokemon.findOne({
      where: { name: newPokemon.name },
      include: {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    return pokemonCreated;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Exporta las funciones para su uso en las rutas
module.exports = {
  getPokemon,
  getPokemon_ById,
  createNewPokemon,
  getPokemon_ByName,
};
