import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk"; //maneja asincronia dentro de redux
import Reducer from "../redux/reducer.js";

const store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
