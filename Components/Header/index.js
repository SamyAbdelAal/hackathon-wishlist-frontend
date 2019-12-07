import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Icon, Text } from "native-base";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-navigation";
import { Button } from "native-base";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
class Header extends Component {
  render() {
    let { title, navigation, actionFunction } = this.props;

    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={{
          height: "15%"
        }}
      >
        <View style={styles.container}>
          <Button
            onPress={() => navigation.goBack()}
            transparent
            style={{ left: "5%", position: "absolute" }}
          >
            <Icon
              name="ios-arrow-back"
              type="Ionicons"
              style={styles.backButtonIcon}
            />
          </Button>
          <Text uppercase style={styles.title}>
            {" "}
            {title}{" "}
          </Text>
          <Button
            onPress={() => {
              if (this.props.userInfo) {
                this.props.getWishItems(this.props.userInfo.user_id);

                navigation.state.routeName !== "Wishlist" &&
                  navigation.push("Wishlist");
              } else navigation.navigate("LandingPAge");
            }}
            transparent
            style={{ right: "5%", position: "absolute" }}
          >
            <Icon name="profile" type="AntDesign" style={{ color: "#fff" }} />
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  wishItems: state.wishlistReducer.wishItems
});
const mapDispatchToProps = dispatch => ({
  getWishItems: userId => dispatch(actionCreators.getWishItems(userId)),

  logout: navigation => dispatch(actionCreators.logout(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    zIndex: 13,
    paddingHorizontal: wp(5),
    // paddingBottom: hp(2),
    // paddingTop: hp(1),
    flexDirection: "row",
    backgroundColor: "#0000",
    alignItems: "center",
    width: wp("100%"),
    height: 70
    // backgroundColor: "red"
  },
  title: {
    // position: "absolute",
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold"
  },
  backButtonIcon: {
    color: "#fff",
    fontSize: 35
  }
});
