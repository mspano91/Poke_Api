const {
  getPokemon,
  getPokemon_ById,
  createNewPokemon,
  getPokemon_ByName,
  getPokemon_ById_BD,
} = require("../controllers/pokemonController");

const { Pokemon, Type } = require("../db");

// get All pokemons main handler
const getPokemonHandler = async (req, res) => {
  try {
    const pokemonList = await getPokemon();
    const pokemonsDb = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    const allPokemons = [...pokemonList, ...pokemonsDb];

    return res.status(200).json(allPokemons);
  } catch (error) {
    return res.status(500).json({ erorr: error.message });
  }
};

const getPokemonById_Handler = async (req, res) => {
  try {
    const { id } = req.params;
    // is is Nan so search in DB
    if (isNaN(id)) {
      const data = await getPokemon_ById_BD(id); //search in DB
      return res.status(200).json(data);
    } else {
      const data = await getPokemon_ById(id); //Search API
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ erorr: error.message });
  }
};

const getPokemonByName_handler = async (req, res) => {
  try {
    const { name } = req.params;
    const data = await getPokemon_ByName(name);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ erorr: error.message });
  }
};

const postPokemonHandler = async (req, res) => {
  try {
    const data = req.body;
    if (
      !data.name ||
      !data.weight ||
      !data.height ||
      !data.hp ||
      !data.skills ||
      !data.image
    )
      return res.status(400).json("missing form data");

    const findPokemon = await Pokemon.findOne({
      where: { name: data.name.toLowerCase() },
    });

    if (findPokemon)
      return res.status(302).json({ message: "this pokemon already exists" });
    const newPokemon = await createNewPokemon(data);
    return res.json(newPokemon);
  } catch (error) {
    return res.status(500).json({ erorr: error.message });
  }
};

const deletePokemon_Handler = async (req, res) => {
  try {
    const { id } = req.params;

    const deletePoke = await Pokemon.findByPk(id);
    await deletePoke.destroy();
    return res.status(200).json(id);
  } catch (error) {
    return res.status(500).json({ erorr: error.message });
  }
};

module.exports = {
  getPokemonHandler,
  getPokemonById_Handler,
  postPokemonHandler,
  deletePokemon_Handler,
  getPokemonByName_handler,
};
