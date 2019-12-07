import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { Text, Button, Icon } from "native-base";
import Header from "../Header";
import AddItem from "./AddItem";
import { connect } from "react-redux";
import WishItemCard from "./WishItemCard";
import * as actionCreators from "../../store/actions";
import { Linking } from "expo";
class OthersWishlist extends Component {
  state = { isVisible: false };

  componentDidMount() {
    // Linking.addEventListener("url", event => Linking.parse(event.url));
    console.log(
      "------------",
      this.props.navigation.getParam("userId", false)
    );

    if (this.props.navigation.getParam("userId", false)) {
      this.props.checkForExpiredToken({ navigate: () => {} });

      this.props.getWishItems(
        this.props.navigation.getParam("userId", 0),
        true
      );
    }
  }
  renderItem = item => (
    <WishItemCard
      sameUser={
        this.props.userInfo &&
        this.props.userInfo.user_id.toString() ===
          this.props.navigation.getParam("userId", false)
      }
      key={item.id}
      navigation={this.props.navigation}
      item={item}
    />
  );
  render() {
    console.log(this.props.otherUserWishList);

    return (
      <View style={{ height: "100%" }}>
        <Header title={`Shared wishlist`} navigation={this.props.navigation} />
        <FlatList
          contentContainerStyle={{
            paddingBottom: "2%",
            height: "30%"
            // flex: 1
          }}
          // style={{ height: "100%", width: "100%" }}
          data={this.props.otherUserWishList}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={item => this.renderItem(item)}
        />

        <AddItem
          closeModal={() => this.setState({ isVisible: false })}
          sameUser={
            this.props.userInfo &&
            this.props.userInfo.user_id.toString() ===
              this.props.navigation.getParam("userId", false)
          }
          isVisible={this.state.isVisible}
        />
        {this.props.userInfo &&
          this.props.userInfo.user_id.toString() ===
            this.props.navigation.getParam("userId", false) && (
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
          )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  wishItems: state.wishlistReducer.wishItems,
  otherUserWishList: state.wishlistReducer.otherUserWishList
});
const mapDispatchToProps = dispatch => ({
  getWishItems: (userId, otherUSer) =>
    dispatch(actionCreators.getWishItems(userId, otherUSer)),
  checkForExpiredToken: navigation =>
    dispatch(actionCreators.checkForExpiredToken(navigation)),
  logout: navigation => dispatch(actionCreators.logout(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(OthersWishlist);
