import React, { Component } from "react";
import { View } from "react-native";
import { Text } from "native-base";
import Header from "../Header";

export default class Wishlist extends Component {
  render() {
    return (
      <View style={{}}>
        <Header title={"wishlist"} navigation={this.props.navigation} />
        {/* <Text style={{}}>hi</Text> */}
      </View>
    );
  }
}
