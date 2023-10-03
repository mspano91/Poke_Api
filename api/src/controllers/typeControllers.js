const { Type } = require("../db");
const axios = require("axios");

const URL = "https://pokeapi.co/api/v2/type";

const getType = async (req, res) => {
  try {
    const findType = await Type.findAll();
    //buscamos en la db LOS Types y los traemos
    if (findType.length) return res.status(200).json(findType);
    //sino traemos de la api y los insertamos en la db
    const { data } = await axios(`${URL}`);
    let types = data.results;
    //con un bucle for eliminamos la url de los objetos
    for (let type of types) {
      const typeData = await axios(type.url);
      delete type.url;
      type.id = typeData.data.id;
    }
    //insertamos los types a la BS
    const typeDb = await Type.bulkCreate(types);
    return res.status(200).json(typeDb);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getType;
