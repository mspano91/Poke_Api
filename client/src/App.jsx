import { Route, Routes } from "react-router-dom";
// import Nav from "./components/nav_component/Nav";
import "./App.css";
import Home from "./views/home/Home";
import Details from "./views/details/Details";
import axios from "axios";

// import { useState } from "react";
axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
