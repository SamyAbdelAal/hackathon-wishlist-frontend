import { setAuthToken, setCurrentUser, login } from "./loginActions";
import Axios from "axios";
import { showMessage } from "react-native-flash-message";

const instance = () =>
  Axios.create({
    baseURL: "http://127.0.0.1:7000/" //"http://192.168.150.210:8000/"
  });

export const registerUser = (
  userInfo,
  closeModal,
  showErrorMessage,
  navigation
) => {
  return (dispatch, getState) => {
    console.log("userInfo", userInfo);

    instance()
      .post(`signup/`, userInfo)
      .then(res => {
        return res.data;
      })
      .then(async user => {
        console.log("userrr", user);
        dispatch(login(userInfo, closeModal, showErrorMessage, navigation));
      })
      //     const decodedUser = jwt_decode(user.token);
      //     await setAuthToken(user.token);
      //     return { user: decodedUser, message: user.message };
      //   })
      //   .then(decodedUser => dispatch(setCurrentUser(decodedUser)))
      //   .then(() => {
      //     if (getState().auth.userInfo) {
      //       navigation.navigate("List");
      //     }
      //   })
      .catch(err => {
        console.log("registerUser error", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong while registering, please try again.",
          type: "danger",
          position: "top"
        });
      });
  };
};
