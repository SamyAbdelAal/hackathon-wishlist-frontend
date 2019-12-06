import * as actionTypes from "../actions/actionTypes";
const initialState = {
  userid: null,
  userInfo: null,
  loading: false,
  loadingUpdateInfo: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        userid: action.payload.user.userid,
        userInfo: action.payload.user,
        loading: false
      };

    case actionTypes.UPDATE_USERINFO:
      return {
        ...state,
        loadingUpdateInfo: false,
        userInfo: { ...state.userInfo, ...action.payload }
      };
    case actionTypes.SET_LOADING_USER:
      return {
        ...state,
        loading: action.payload
      };
    case actionTypes.SET_LOADING_ACCOUNT_UPDATE:
      return {
        ...state,
        loadingUpdateInfo: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
