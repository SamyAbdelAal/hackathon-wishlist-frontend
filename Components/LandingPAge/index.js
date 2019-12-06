import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, Icon } from "native-base";
import { connect } from "react-redux";
import Login from "../Login";
import { SafeAreaView } from "react-navigation";
import * as actionCreators from "../../store/actions";

class LandingPage extends Component {
  componentDidMount() {
    this.props.checkForExpiredToken();
  }
  state = { isVisible: false };
  render() {
    let { isVisible } = this.state;
    let { userInfo } = this.props;
    console.log("userInfo", userInfo);

    return (
      <View>
        <SafeAreaView
          forceInset={{ top: "always", bottom: "never" }}
          style={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Icon
            name="circle"
            type="FontAwesome"
            style={{
              color: "#000",
              fontSize: 500,
              opacity: 0.1,
              position: "absolute",
              top: -200,
              alignSelf: "center"
            }}
          />
          <Icon
            name="edit"
            type="Feather"
            style={{
              color: "#fff",
              fontSize: 100,
              padding: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 6 },
              shadowRadius: 3,
              shadowOpacity: 0.2
            }}
          />
          <Text
            uppercase
            style={{
              color: "#fff",
              fontSize: 24,
              fontWeight: "bold",
              paddingBottom: 30
            }}
          >
            Wishlist
          </Text>
          <Button
            rounded
            style={styles.button}
            onPress={() =>
              userInfo
                ? this.props.navigation.navigate("Wishlist")
                : this.setState({ isVisible: true })
            }
          >
            <Text style={styles.text}> Start your list</Text>
          </Button>
          {userInfo && (
            <Button
              rounded
              style={styles.button}
              onPress={() => this.props.logout(this.props.navigation)}
            >
              <Text style={[styles.text]}> logout</Text>
            </Button>
          )}
          <Login
            closeModal={() => this.setState({ isVisible: false })}
            navigation={this.props.navigation}
            isVisible={isVisible}
          ></Login>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  button: {
    backgroundColor: "#ff925f",
    width: "50%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  }
});

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo
});
const mapDispatchToProps = dispatch => ({
  checkForExpiredToken: navigation =>
    dispatch(actionCreators.checkForExpiredToken(navigation)),
  logout: navigation => dispatch(actionCreators.logout(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
