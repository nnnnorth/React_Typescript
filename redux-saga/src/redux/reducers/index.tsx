import { combineReducers } from "redux";
import counter from "./counter";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  counter
});
export default rootReducer;
