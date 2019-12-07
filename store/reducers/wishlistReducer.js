import * as actionTypes from "../actions/actionTypes";
const initialState = {
  wishItems: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      console.log("action.payload", state.wishItems);

      let newItems = state.wishItems.concat([action.payload]);
      return {
        ...state,
        wishItems: newItems.reverse()
      };
    case actionTypes.GET_ITEMS:
      return {
        ...state,
        wishItems: action.payload
      };
    case actionTypes.DELETE_ITEM:
      console.log("action.payload", action.payload);
      console.log("state.wishItems", state.wishItems);

      let filterWishlist = state.wishItems.filter(
        item => item.id !== action.payload
      );
      return {
        ...state,
        wishItems: filterWishlist
      };
    default:
      return state;
  }
};

export default reducer;
