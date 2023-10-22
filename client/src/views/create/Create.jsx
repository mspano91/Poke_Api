import Styles from "../../views/create/create.styles.module.css";
import React, { useState, useEffect } from "react";
import { getPokemonTypes, postNewPokemon } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validate from "../../components/validate";
import Swal from "sweetalert2";

function Create() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types); //taking types and pokemons from global state
  const pokemons = useSelector((state) => state.pokemonsCopy);

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
    if (pokemons.some((pokemon) => pokemon.name === formData.name)) {
      Swal.fire({
        title: "This pokemon already exists.",
        confirmButtonText: "Try again!",
        background: "#1A1A1A",
      });
      return;
    }
    if (
      !formData.name ||
      formData.type.length === 0 ||
      !formData.image ||
      errors.length
    ) {
      Swal.fire({
        title: "Form is incomplete!",
        confirmButtonText: "Try again!",
        background: "#1A1A1A",
      });
      return;
    }
    if (errors.name) {
      Swal.fire({
        title: errors.name,
        confirmButtonText: "Try again!",
        background: "#1A1A1A",
      });
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
      <div className={Styles.formContainer}>
        <button className={Styles.btn2} onClick={() => navigate("/home")}>
          Back home
        </button>
        <div className={Styles.contain}>
          <h1>Create Pokémon</h1>
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
            <button className={Styles.btn} type="submit">
              Create!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
