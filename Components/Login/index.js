import React, { Component } from "react";
import { View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { Input, Icon, Item, Text, Button } from "native-base";
import * as actionCreators from "../../store/actions";
import { connect } from "react-redux";
import { BlurView } from "expo-blur";
import FlashMessage, { showMessage } from "react-native-flash-message";
class Login extends Component {
  state = { username: "", password: "", isVisible: false };

  showErrorMessage = () => {
    let { username, password } = this.state;
    console.log("lkjnkhb");

    // showMessage({
    //   message: "Username or password is incorrect",
    //   type: "danger"
    // });
    this.refs.modalFlash.showMessage({
      message:
        username === "" || password === ""
          ? "Please complete the form!"
          : "Username or password is incorrect",
      type: "danger"
    });
  };
  render() {
    let { isVisible, closeModal } = this.props;
    return (
      <ReactNativeModal
        animationIn={"pulse"}
        animationOut={"zoomOut"}
        backdropOpacity={0.8}
        style={{ margin: 0 }}
        isVisible={isVisible}
      >
        <BlurView intensity={95} tint="dark" style={{ height: "100%" }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              uppercase
              style={{
                alignSelf: "center",
                fontSize: 25,
                fontWeight: "bold",
                color: "#fff"
              }}
            >
              Login
            </Text>
            <Item style={{ width: "70%", alignSelf: "center" }}>
              <Text style={{ color: "#fff" }}>Username</Text>
              <Input
                style={{ color: "#fff" }}
                onChangeText={username => this.setState({ username })}
              />
            </Item>
            <Item style={{ width: "70%", alignSelf: "center" }}>
              <Text style={{ color: "#fff" }}>Password</Text>
              <Input
                secureTextEntry={true}
                style={{ color: "#fff" }}
                onChangeText={password => this.setState({ password })}
              />
            </Item>
            <Button
              rounded
              style={{
                width: "50%",
                alignSelf: "center",
                margin: 10,
                justifyContent: "center",
                backgroundColor: "#ff925f"
              }}
              onPress={() =>
                this.props.login(
                  this.state,
                  closeModal,
                  this.showErrorMessage,
                  this.props.navigation
                )
              }
            >
              <Text> Login</Text>
            </Button>
            <Button
              rounded
              style={{
                width: "50%",
                alignSelf: "center",
                margin: 10,
                justifyContent: "center",
                backgroundColor: "#ff925f"
              }}
              onPress={() => {
                this.props.registerUser(
                  this.state,
                  closeModal,
                  this.showErrorMessage,
                  this.props.navigation
                );
                // this.props.navigation.navigate("Wishlist");
              }}
            >
              <Text> Register</Text>
            </Button>
          </View>
          <Button
            onPress={closeModal}
            rounded
            transparent
            style={{
              width: 60,
              height: 60,
              alignItems: "center",
              top: "5%",
              position: "absolute"
            }}
          >
            <Icon
              name="cross"
              type="Entypo"
              style={{ fontSize: 30, color: "#fff" }}
            />
          </Button>
          <FlashMessage ref="modalFlash" position="top" type={"danger"} />
        </BlurView>
      </ReactNativeModal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (userInfo, closeModal, showErrorMessage, navigation) =>
    dispatch(
      actionCreators.login(userInfo, closeModal, showErrorMessage, navigation)
    ),
  registerUser: (userInfo, closeModal, showErrorMessage, navigation) =>
    dispatch(
      actionCreators.registerUser(
        userInfo,
        closeModal,
        showErrorMessage,
        navigation
      )
    )
});

export default connect(null, mapDispatchToProps)(Login);
