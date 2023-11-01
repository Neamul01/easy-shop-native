const { combineReducers, createStore, applyMiddleware } = require("redux");
const { composeWithDevTools } = require("redux-devtools-extension");
import thunkMiddleware from "redux-thunk";
import cartItems from "./Reducers/cartItem";

const reducers = combineReducers({
  cartItems,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
