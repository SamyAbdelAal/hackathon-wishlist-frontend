import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import LandingPage from "./Components/LandingPAge";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import AppNavigator from "./Components/Navigations/index";
import { LinearGradient } from "expo-linear-gradient";
import FlashMessage from "react-native-flash-message";
import { ActivityIndicator } from "react-native-paper";

export default function App() {
  renderLoading = () => (
    <View
      style={{
        container: {
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          backgroundColor: "#0000",
          justifyContent: "center"
        }
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={this.renderLoading()}>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          style={{
            backgroundColor: "transparent",
            marginTop: 0,
            paddingTop: 0
          }}
        />
        <LinearGradient
          colors={["#6200FF", "#8900FF"]}
          locations={[1, 0.3]}
          style={{ ...StyleSheet.absoluteFillObject }}
        />
        <View
          style={{
            backgroundColor: "transparent",
            marginTop: 0,
            paddingTop: 0
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
            backgroundColor: "#0000",
            justifyContent: "center"
          }}
        >
          <AppNavigator />
        </View>
        <FlashMessage icon="auto" duration={4000} position="top" />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
