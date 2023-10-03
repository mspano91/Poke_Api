const {
  getPokemon,
  getPokemon_ById,
  postNew_pokemon,
} = require("../controllers/pokemonController");

//aca vamos a hacer el handler de la peticion general a la api para que me traiga todos
const getPokemonHandler = async (req, res) => {
  try {
    const pokemonList = await getPokemon();
    return res.status(200).json(pokemonList);
  } catch (error) {
    return res.status(500).send("El getPokemonHandler no funca");
  }
};

//aca vamos a recibir por params porque recibe un ID
const getPokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getPokemon_ById(id);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send("El getPokemonHandler no funca");
  }
};

const postPokemon = (req, res) => {
  res.status(200).send(console.log("got to the endpoint"));
};

module.exports = {
  getPokemonHandler,
  getPokemonById,
  postPokemon,
};
