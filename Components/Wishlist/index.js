import React, { Component } from "react";
import { View, FlatList, Clipboard } from "react-native";
import { Text, Button, Icon } from "native-base";
import Header from "../Header";
import AddItem from "./AddItem";
import { connect } from "react-redux";
import WishItemCard from "./WishItemCard";
import { showMessage } from "react-native-flash-message";

class Wishlist extends Component {
  state = { isVisible: false };

  renderItem = item => (
    <WishItemCard
      key={item.id}
      navigation={this.props.navigation}
      item={item}
    />
  );
  onShare = async () => {
    Clipboard.setString(
      `exp://127.0.0.1:19004/--/main_navigator/userWishlist/?userId=${this.props.userInfo.user_id}`
    );
    showMessage({ message: "Share link copied to clipboard", type: "success" });
  };
  render() {
    return (
      <View style={{ height: "100%" }}>
        <Header
          title={`${this.props.userInfo.username} wishlist`}
          navigation={this.props.navigation}
        />
        <FlatList
          contentContainerStyle={{
            paddingBottom: "2%",
            height: "30%"
            // flex: 1
          }}
          // style={{ height: "100%", width: "100%" }}
          data={this.props.wishItems}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={item => this.renderItem(item)}
        />
        <Button
          transparent
          style={{ width: "20%", bottom: "25%" }}
          onPress={this.onShare}
        >
          <Icon
            name="sharealt"
            type="AntDesign"
            style={{ color: "#fff", fontSize: 30 }}
          />
        </Button>
        <AddItem
          closeModal={() => this.setState({ isVisible: false })}
          isVisible={this.state.isVisible}
        />
        <Button
          onPress={() => this.setState({ isVisible: true })}
          // transparent
          style={{
            right: "5%",
            bottom: "10%",
            position: "absolute",
            width: "20%",
            height: "9%",
            justifyContent: "center",
            backgroundColor: "#ff925f",
            borderRadius: 50
          }}
        >
          <Icon
            name="plus"
            type="AntDesign"
            style={{ color: "#fff", fontSize: 40 }}
          />
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  wishItems: state.wishlistReducer.wishItems
});
const mapDispatchToProps = dispatch => ({
  checkForExpiredToken: navigation =>
    dispatch(actionCreators.checkForExpiredToken(navigation)),
  logout: navigation => dispatch(actionCreators.logout(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
