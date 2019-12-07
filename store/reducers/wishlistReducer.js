import * as actionTypes from "../actions/actionTypes";
const initialState = {
  wishItems: [],
  otherUserWishList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      let newItems = state.wishItems.concat([action.payload]);
      return {
        ...state,
        wishItems: newItems.reverse()
      };
    case actionTypes.ADD_ITEM_SAMEUSER:
      let newItemsSameUser = state.otherUserWishList.concat([action.payload]);
      return {
        ...state,
        otherUserWishList: newItemsSameUser.reverse()
      };
    case actionTypes.GET_ITEMS:
      return {
        ...state,
        wishItems: action.payload
      };
    case actionTypes.GET_ITEMS_OTHERUSER:
      return {
        ...state,
        otherUserWishList: action.payload
      };
    case actionTypes.DELETE_ITEM:
      let filterWishlist = state.wishItems.filter(
        item => item.id !== action.payload
      );
      return {
        ...state,
        wishItems: filterWishlist
      };
    case actionTypes.DELETE_ITEM_SAMEUSER:
      let filterWishlistOther = state.otherUserWishList.filter(
        item => item.id !== action.payload
      );
      return {
        ...state,
        otherUserWishList: filterWishlistOther
      };
    case actionTypes.UPDATE_ITEM:
      let newItemsChecked = state.wishItems.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        } else return item;
      });

      return {
        ...state,
        wishItems: [...newItemsChecked]
      };
    case actionTypes.UPDATE_ITEM_OTHERUSER:
      console.log("UPDATE_ITEM_OTHERUSER", action.payload);

      let newItemsOtherChecked = state.otherUserWishList.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        } else return item;
      });

      return {
        ...state,
        otherUserWishList: [...newItemsOtherChecked]
      };
    default:
      return state;
  }
};

export default reducer;
