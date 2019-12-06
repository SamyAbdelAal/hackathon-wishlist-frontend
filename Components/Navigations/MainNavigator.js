import { FluidNavigator } from "react-navigation-fluid-transitions";

import Animated, { Easing } from "react-native-reanimated";
import LandingPAge from "../LandingPAge";
import Wishlist from "../Wishlist";
import Header from "../Header";
export default FluidNavigator(
  {
    LandingPAge: LandingPAge,
    Wishlist: Wishlist,
    Header: Header
  },

  {
    transConfig,

    initialRouteName: "LandingPAge",
    mode: "card",
    navigationOptions: {
      gesturesEnabled: true,
      headerStyle: {
        backgroundColor: "#0000"
      },
      headerTintColor: "#0000",
      headerTextStyle: {
        fontWeight: "bold"
      }
    },
    cardStyle: {
      backgroundColor: "#0000",
      opacity: 1
    }
  }
);

const transConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});
