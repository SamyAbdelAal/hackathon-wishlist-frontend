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
    case actionTypes.DELETE_ITEM:
      return {
        ...state,
        wishItems: state.wishItems.filter(item => item.id !== action.payload.id)
      };
    default:
      return state;
  }
};

export default reducer;
