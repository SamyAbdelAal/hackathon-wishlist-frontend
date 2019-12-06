import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

// import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

export default createAppContainer(
  createSwitchNavigator({
    // AuthRoot: { screen: AuthNavigator, path: "auth_navigator" },
    MainRoot: { screen: MainNavigator, path: "main_navigator" }
  })
);
