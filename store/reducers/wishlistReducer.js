import * as actionTypes from "../actions/actionTypes";
const initialState = {
  wishItems: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      return {
        ...state,
        wishItems: [...state.wishItems, action.payload]
      };
    case actionTypes.GET_ITEMS:
      return {
        ...state,
        wishItems: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
