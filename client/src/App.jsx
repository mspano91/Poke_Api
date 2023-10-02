import { Route, Switch } from "react-router-dom";
// import Nav from "./components/nav_component/Nav";
import "./App.css";
import Home from "./views/home/Home";
import Details from "./views/details/Details";
import axios from "axios";
// import { useState } from "react";
axios.defaults.baseURL = "http://localhost:3001";

function App() {
  // const [pagination, setPagination] = useState(1);
  // const [charsPerPage, setCharsPerPage] = useState(5);

  // const maximum = Pokemons.length / charsPerPage;

  return (
    <div className="App">
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/home:id" component={Details} />
      </Switch>
    </div>
  );
}

export default App;
