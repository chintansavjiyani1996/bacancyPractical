import { DATA_LOADING, GETSTORIES } from "../actions/actions";

const initialState = {
  isLoading: false,
  stories: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GETSTORIES:
      return {
        ...state,
        stories: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
