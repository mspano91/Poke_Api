const {
  getPokemon,
  getPokemon_ById,
  createNewPokemon,
} = require("../controllers/pokemonController");

const { Pokemon } = require("../db");

//aca vamos a hacer el handler de la peticion general a la api para que me traiga todos
const getPokemonHandler = async (req, res) => {
  try {
    const pokemonList = await getPokemon();
    const pokemonsDb = await Pokemon.findAll();
    //buscamos todos en la bd
    const allPokemons = [...pokemonList, ...pokemonsDb];

    return res.status(200).json(allPokemons);
  } catch (error) {
    return res.status(500).send("El getPokemonHandler no funca");
  }
};

//aca vamos a recibir por params porque recibe un ID
const getPokemonById_Handler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getPokemon_ById(id);
    console.log(data);
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

module.exports = {
  getPokemonHandler,
  getPokemonById_Handler,
  postPokemonHandler,
};
