const {
  getPokemon,
  getPokemon_ById,
  createNewPokemon,
  getPokemon_ByName,
  getPokemon_ById_BD,
} = require("../controllers/pokemonController");

const { Pokemon, Type } = require("../db");

//aca vamos a hacer el handler de la peticion general a la api para que me traiga todos
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
    //buscamos todos en la bd
    const allPokemons = [...pokemonList, ...pokemonsDb];

    return res.status(200).json(allPokemons);
  } catch (error) {
    return res.status(500).send("El getPokemonHandler no funca");
  }
};

const getPokemonById_Handler = async (req, res) => {
  try {
    const { id } = req.params;
    //si el id no es un numero buscar en el controller de la base de dato
    if (isNaN(id)) {
      const data = await getPokemon_ById_BD(id); //busca en la bd
      return res.status(200).json(data);
    } else {
      const data = await getPokemon_ById(id); //hace peticion a la api
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ erorr: error.message });
  }
};

const getByNav_handler = async (req, res) => {
  try {
    const { name } = req.params;
    const data = await getPokemon_ByName(name);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send("El getPokemonHandler no funca");
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
      return res.status(400).json("faltan datos");

    const findPokemon = await Pokemon.findOne({
      where: { name: data.name.toLowerCase() },
    });

    if (findPokemon)
      return res.status(302).json({ message: "this pokemon already exists" });
    const newPokemon = await createNewPokemon(req.body);
    return res.json(newPokemon);
  } catch (error) {
    return res.status(500).send("El postPokemonHandler no funca");
  }
};

const deletePokemon_Handler = async (req, res) => {
  try {
    const { id } = req.params;

    const deletePoke = await Pokemon.findByPk(id);
    await deletePoke.destroy();
    return res.status(200).json(id);
  } catch (error) {
    return res.status(500).send("El deletePokemon_Handler no funca");
  }
};

module.exports = {
  getPokemonHandler,
  getPokemonById_Handler,
  postPokemonHandler,
  deletePokemon_Handler,
  getByNav_handler,
};
