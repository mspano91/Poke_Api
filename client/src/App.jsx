import { Route, Switch } from "react-router-dom";
// import Nav from "./components/nav_component/Nav";
import "./App.css";
import Home from "./views/home/Home";
import Details from "./views/details/Details";

function App() {
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
