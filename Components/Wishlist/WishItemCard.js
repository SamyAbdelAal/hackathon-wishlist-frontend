import React, { Component } from "react";
import { View, Image } from "react-native";
import { Button } from "react-native-paper";
import { Icon, Text } from "native-base";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { showMessage } from "react-native-flash-message";
class WishItemCard extends Component {
  render() {
    let { item } = this.props;

    return (
      <View
        style={{
          width: "45%",
          borderRadius: 30,
          overflow: "hidden",
          marginHorizontal: 10,
          margin: 10
        }}
      >
        <TouchableOpacity
          onPress={() =>
            item.item.url
              ? this.props.navigation.navigate("WebView", {
                  title: item.item.name,
                  url: item.item.url
                })
              : showMessage({ message: "No url provided", type: "info" })
          }
        >
          <Image
            source={{ uri: item.item.image }}
            style={{ height: "60%", width: "100%", backgroundColor: "#fff2" }}
          />
          <Icon
            name="image"
            type="Entypo"
            style={{
              fontSize: 80,
              position: "absolute",
              alignSelf: "center",
              top: "10%"
            }}
          />

          <View style={{ backgroundColor: "#0002", height: "40%" }}>
            <Text
              uppercase
              style={{
                padding: 5,
                fontSize: 18,
                fontWeight: "bold",
                color: "#fff"
              }}
            >
              {item.item.name}
            </Text>
            <View
              style={{
                borderWidth: 1,
                width: 20,
                height: 20,
                borderColor: "#000",
                alignSelf: "flex-end",
                right: 15,
                borderRadius: 30
              }}
            ></View>
          </View>
        </TouchableOpacity>
        <Button
          onPress={() => this.props.deleteWishItems(item.item.id)}
          //   transparent
          style={{
            width: 60,
            height: 60,
            alignItems: "center",
            top: "2%",
            left: -10,
            position: "absolute"
          }}
        >
          <Icon
            name="cross"
            type="Entypo"
            style={{ fontSize: 30, color: "#fff" }}
          />
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo
});
const mapDispatchToProps = dispatch => ({
  deleteWishItems: itemId => dispatch(actionCreators.deleteWishItems(itemId))
});

export default connect(mapStateToProps, mapDispatchToProps)(WishItemCard);
