import { combineReducers } from "redux";
import loading from "./loadReducer";
import toast from "./toastReducer";

export default combineReducers({
  loading,
  toast,
});
