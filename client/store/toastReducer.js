import { ADD_TOAST } from "./actionTypes";

export const addToast = (message) => ({ type: ADD_TOAST, message });

export default function toast(state = {}, action) {
  switch (action.type) {
    case ADD_TOAST:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
}
