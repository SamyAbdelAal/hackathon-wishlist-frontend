import axios from "axios";
import jwt_decode from "jwt-decode";
import * as SecureStore from "expo-secure-store";

import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";

const instance = axios.create({
  baseURL: "http://192.168.150.210:8000/"
});

export const setAuthToken = token => {
  if (token) {
    return SecureStore.setItemAsync("token", token)
      .then(
        () => (axios.defaults.headers.common.Authorization = `JWT ${token}`)
      )
      .catch(err => {
        //  console.log("setAuthToken setItem token", err.message || err.response )
        showMessage({
          message: "Oops! Something went wrong! Please try again later.",
          type: "warning",
          position: "top",
          description: err.message || err.response
        });
      });
  } else {
    return SecureStore.deleteItemAsync("token")
      .then(() => delete axios.defaults.headers.common.Authorization)
      .catch(err => {
        // console.log(
        //   "setAuthToken removeItem token",
        //   err.message || err.response
        // )
        showMessage({
          message: "Oops! Something went wrong! Please try again later.",
          type: "warning",
          position: "top",
          description: err.message || err.response
        });
      });
  }
};

export const checkForExpiredToken = navigation => {
  return (dispatch, getState) => {
    // dispatch({ type: actionTypes.CHECKING_FOR_TOKEN, payload: true });
    return SecureStore.getItemAsync("token").then(token => {
      if (token) {
        const currentTime = Date.now() / 1000;
        const user = jwt_decode(token);
        if (user.exp >= currentTime && user.tmp_pwd !== "1") {
          setAuthToken(token).then(() =>
            dispatch(
              setCurrentUser({
                user: user,
                message: "Logged-in Successfully"
              })
            )
          );

          // .then(() => {
          //   navigation.navigate("List");
          // });
        } else {
          dispatch(logout(navigation));
        }
      }
    });
  };
};

export const login = (userData, closeModal, showErrorMessage, navigation) => {
  console.log(userData);

  return (dispatch, getState) => {
    // dispatch({
    //   type: actionTypes.SET_LOADING_USER,
    //   payload: true
    // });
    instance
      .post("signin/", userData)
      .then(res => {
        return res.data;
      })
      .then(async user => {
        console.log("login", user);

        let decodedUser = null;
        if (user.hasOwnProperty("token")) {
          decodedUser = jwt_decode(user.token);
          let promise = await setAuthToken(user.token);
          return { user: decodedUser, message: user.message };
        } else {
          showMessage({
            message: user.message,
            type: "warning",
            position: "top"
          });
          // dispatch({
          //   type: actionTypes.SET_LOADING_USER,
          //   payload: false
          // });
          const obj = { user: decodedUser, message: user.message };
          return obj;
        }
        // }
      })
      .then(decodedUser => {
        if (decodedUser && decodedUser.user) {
          dispatch(setCurrentUser(decodedUser));
        }
      })
      .then(() => {
        if (getState().auth.userInfo) {
          navigation.navigate("Wishlist");
          closeModal();
        }

        // dispatch(getBusinessAccounts());
        // dispatch(send_push_notification());
      })
      .catch(err => {
        // dispatch({
        //   type: actionTypes.SET_LOADING_USER,
        //   payload: false
        // });
        // if (err.response.includes("400")) {
        //   err.response = "User or password are incorrect";
        // }
        console.log("login error", err.response.data);
        showErrorMessage();
        // showMessage({
        //   type: "danger",
        //   message:
        //     err.message ||
        //     err.response ||
        //     "Something went wrong, please try again.",
        //   position: "top"
        // });
      });
  };
};

export const setCurrentUser = user => {
  return dispatch => {
    // console.log("user:", user);

    if (user) {
      return dispatch({
        type: actionTypes.SET_CURRENT_USER,
        payload: user
      });
    } else {
      return dispatch({
        type: actionTypes.LOGOUT_USER,
        payload: { user }
      });
    }
  };
};
export const logout = navigation => {
  return (dispatch, getState) => {
    setAuthToken()
      .then(() => dispatch(setCurrentUser(null)))
      .then(() => {
        navigation.navigate("LandingPage");
      });
  };
};
