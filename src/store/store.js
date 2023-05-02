import { createStore } from "redux";
import FavorReducer from "./reducers/favorReducer";

const store = createStore(FavorReducer)

export default store