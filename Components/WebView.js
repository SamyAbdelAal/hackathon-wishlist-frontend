import React, { Component } from "react";
import { Text, View } from "react-native";
import WebView from "react-native-webview";
import Header from "./Header";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-navigation";

export default class WebViewComp extends Component {
  render() {
    let url = this.props.navigation.getParam("url");
    let title = this.props.navigation.getParam("title");
    return (
      <View style={{ height: "100%" }}>
        <Header title={title} navigation={this.props.navigation} />
        <WebView
          startInLoadingState={true}
          renderLoading={() => (
            <View style={{ height: "100%", backgroundColor: "#0000" }}>
              <ActivityIndicator />
            </View>
          )}
          style={{ backgroundColor: "transparent" }}
          contentContainerStyle={{ backgroundColor: "transparent" }}
          ref={ref => (this.webview = ref)}
          source={{ uri: url }}
        />
      </View>
    );
  }
}
