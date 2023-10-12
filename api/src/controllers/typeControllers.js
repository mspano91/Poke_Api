const { Type } = require("../db");
const axios = require("axios");

const URL = "https://pokeapi.co/api/v2/type";

const getType = async (req, res) => {
  try {
    const findType = await Type.findAll();
    //find in database and bring it
    if (findType.length) return res.status(200).json(findType);
    //if not, bring to the api and will save those in database
    const { data } = await axios(`${URL}`);
    let types = data.results;
    //loop for to delete url property
    for (let type of types) {
      const typeData = await axios(type.url);
      delete type.url;
      type.id = typeData.data.id;
      //also add new id property
    }
    //insert the data in database
    const typeDb = await Type.bulkCreate(types);

    return res.status(200).json(typeDb);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getType;
