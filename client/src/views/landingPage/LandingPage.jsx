import Styles from "../landingPage/landing.styles.module.css";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <div className={Styles.landing_container}>
      <div className={Styles.banner}>
        <img src="/assets/banner.png" alt="" />
      </div>
      <div>
        <button onClick={() => navigate("/home")}>let´s GO</button>
      </div>
    </div>
  );
}

export default Landing;
