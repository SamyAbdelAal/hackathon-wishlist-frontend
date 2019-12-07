import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { Text, Button, Icon } from "native-base";
import Header from "../Header";
import AddItem from "./AddItem";
import { connect } from "react-redux";
import WishItemCard from "./WishItemCard";

class Wishlist extends Component {
  state = { isVisible: false };

  renderItem = item => <WishItemCard key={item.id} item={item} />;
  render() {
    return (
      <View style={{ height: "100%" }}>
        <Header title={"wishlist"} navigation={this.props.navigation} />
        <FlatList
          contentContainerStyle={{
            // paddingBottom: 30,
            height: "30%"
            // flex: 1
          }}
          // style={{ height: "100%", width: "100%" }}
          data={this.props.wishItems}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={item => this.renderItem(item)}
        />

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
