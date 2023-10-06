import Styles from "../landingPage/landing.styles.module.css";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <div className={Styles.landing_container}>
      <div>
        <h1>hola aca vas a ver pokemones </h1>
        <button onClick={() => navigate("/home")}>let´s GO</button>
      </div>
    </div>
  );
}

export default Landing;
