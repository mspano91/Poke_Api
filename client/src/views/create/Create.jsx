import Styles from "../../views/create/create.styles.module.css";
import React, { useState, useEffect } from "react";
import { getPokemonTypes, postNewPokemon } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validate from "../../components/validate";

function Create() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types); //traemos los types del estado global
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    type: [],
    hp: 50,
    attack: 50,
    defense: 50,
    speed: 50,
    skills: 50,
    weight: 50,
    height: 50,
    image: "",
  });

  const handleInput = (event) => {
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    setErrors(
      validate({
        ...formData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleTypeChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const findType = formData.type.find(
      (el) => Number(el) === Number(event.target.value)
    );
    if (!findType) {
      setFormData({
        ...formData,
        [name]: [...formData.type, value],
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Verifica si alguno de los campos requeridos está vacío
    if (
      !formData.name ||
      formData.type.length === 0 ||
      !formData.image
      // Agrega aquí otras condiciones para los campos requeridos
    ) {
      alert("form incomplete");
      return;
    }

    // Si todos los campos requeridos están completos, envía el formulario
    dispatch(postNewPokemon(formData));
    navigate("/home");
  };

  // Llama a getPokemonTypes para obtener los tipos de Pokémon de la base de datos
  useEffect(() => {
    dispatch(getPokemonTypes());
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/home")}>back</button>
      <h1>Crear nuevo Pokémon</h1>
      <div className={Styles.formContainer}>
        <img />
        <form onSubmit={handleSubmit}>
          {/* para mapear las props del objeto, entries convierte a 
          form data a un array y los itera */}
          {Object.entries(formData).map(([prop, value]) => (
            <div className={Styles.inputContainer} key={prop}>
              <label htmlFor="">{prop}</label>
              {prop === "name" ? (
                <div>
                  <input
                    type="text"
                    value={value}
                    name={prop}
                    onChange={handleInput}
                    placeholder="name"
                  />
                  <br />
                  {/* manejo de errores validacion de campo  */}
                  {errors.name && (
                    <p style={{ fontSize: "20px", color: "white" }}>
                      {errors.name}
                    </p>
                  )}
                </div>
              ) : prop === "type" ? (
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleTypeChange}
                >
                  <option value="">Select</option>
                  {types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              ) : prop === "image" ? (
                <input type="text" onChange={handleInput} name={prop} />
              ) : (
                <input
                  name={prop}
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={value}
                  onChange={handleInput}
                />
              )}

              <p>
                {prop !== "image" &&
                  prop !== "type" &&
                  prop !== "name" &&
                  value}
              </p>
            </div>
          ))}
          <button type="submit">Create!</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
