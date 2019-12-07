import { setAuthToken, setCurrentUser, login } from "./loginActions";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import * as actionTypes from "./actionTypes";
const instance = () =>
  axios.create({
    baseURL: "http://127.0.0.1:7000/" //"http://192.168.150.210:8000/"
  });

export const addWishItem = (item, closeModal, sameUser) => {
  axios.defaults.headers.common = {
    ...axios.defaults.headers.common,
    "Content-Type": "multipart/form-data"
  };

  return dispatch => {
    instance()
      .post(`create/`, item)
      .then(res => {
        return res.data;
      })
      .then(data => {
        console.log(data);
        dispatch({ type: actionTypes.ADD_ITEM, payload: data });
        if (sameUser) {
          dispatch({ type: actionTypes.ADD_ITEM_SAMEUSER, payload: data });
        }
      })
      .then(() => closeModal())
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

export const getWishItems = (userId, otherUser) => {
  return dispatch => {
    instance()
      .get(`list/?user_id=${userId}`)
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: !otherUser
            ? actionTypes.GET_ITEMS
            : actionTypes.GET_ITEMS_OTHERUSER,
          payload: data
        });
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

export const deleteWishItems = (itemId, sameUser) => {
  console.log("item.item.id", itemId);

  return dispatch => {
    instance()
      .delete(`delete/${itemId}/`)
      .then(res => res.data)
      .then(data => {
        console.log(data);
        dispatch({ type: actionTypes.DELETE_ITEM, payload: itemId });
        if (sameUser) {
          dispatch({ type: actionTypes.DELETE_ITEM_SAMEUSER, payload: itemId });
        }
      })
      .catch(err => {
        console.log("deleteWishItems error", err.response || err);

        showMessage({
          message:
            err.response.data.detail === "You must be the owner."
              ? "Not allowed to perform such action"
              : err.response.data.detail ===
                "Authentication credentials were not provided."
              ? "Please sign in"
              : "Something went wrong, please try again.",
          type: "danger",
          description: err.response.data.detail,
          position: "top"
        });
      });
  };
};
