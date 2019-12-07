import { setAuthToken, setCurrentUser, login } from "./loginActions";
import Axios from "axios";
import { showMessage } from "react-native-flash-message";
import * as actionTypes from "./actionTypes";
const instance = Axios.create({
  baseURL: "http://127.0.0.1:7000/" //"http://192.168.150.210:8000/"
});

export const addWishItem = item => {
  console.log(item);
  Axios.defaults.headers.common = {
    ...Axios.defaults.headers.common,
    "Content-Type": "multipart/form-data"
  };
  console.log(Axios.defaults.headers.common);

  return dispatch => {
    instance
      .post(`create/`, item)
      .then(res => {
        console.log(res);

        return res.data;
      })
      .then(data => {
        console.log(data);
        dispatch({ type: actionTypes.ADD_ITEM, payload: data });
      })
      .catch(err => {
        console.log("addWishItem error", err.response);

        showMessage({
          message:
            err.message ||
            err.response.data ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
      });
  };
};

export const getWishItems = userId => {
  return dispatch => {
    instance
      .get(`list/?user_id=${userId}`)
      .then(res => res.data)
      .then(data => {
        console.log(data);
        dispatch({ type: actionTypes.GET_ITEMS, payload: data });
      })
      .catch(err => {
        console.log("addWishItem error", err.response);

        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
      });
  };
};