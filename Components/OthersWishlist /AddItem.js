import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import ReactNativeModal from "react-native-modal";
import { Item, Input, Button, Icon } from "native-base";
import { BlurView } from "expo-blur";
import FlashMessage, { showMessage } from "react-native-flash-message";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as actionCreators from "../../store/actions";
import { connect } from "react-redux";
class AddItem extends Component {
  state = { name: "", url: "", image: "//", formatted: {} };

  askForPermssion = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    console.log("status", status);

    if (status !== "granted") {
      this.onToggleModal(false);
      showMessage({
        message: translate(
          "Please allow access to the gallery to upload media"
        ),
        position: "top",
        type: "warning"
      });
    }
  };
  pick = async () => {
    await this.askForPermssion();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      base64: false,
      exif: false,
      quality: 1
    });

    this.setState({ image: result.uri });
  };

  formatMedia() {
    var body = new FormData();
    if (this.state.image !== "//") {
      let res = this.state.image.split("/");
      res = res[res.length - 1];
      let format = res.split(".");

      var photo = {
        uri: this.state.image,
        type: "IMAGE" + "/" + format[1],
        name: res
      };
      body.append("image", photo);
    }
    body.append("name", this.state.name);
    body.append("url", this.state.url);

    this.setState({
      formatted: body
    });
    return body;
  }
  submit = () => {
    if (this.state.name !== "") {
      this.props.addWishItem(
        this.formatMedia(),
        this.props.closeModal,
        this.props.sameUser
      );
    } else {
      this.refs.ModalRef.showMessage({
        message: "Please add a name",
        type: "warning"
      });
    }
  };

  render() {
    let { isVisible, closeModal } = this.props;

    return (
      <ReactNativeModal
        animationIn={"pulse"}
        animationOut={"zoomOut"}
        backdropOpacity={0.8}
        style={{ margin: 0 }}
        isVisible={isVisible}
      >
        <BlurView
          intensity={95}
          tint="dark"
          style={{ height: "100%", justifyContent: "center" }}
        >
          <Item style={{ width: "70%", alignSelf: "center" }}>
            <Text style={{ color: "#fff" }}>Nmae</Text>
            <Input
              style={{ color: "#fff" }}
              onChangeText={name => this.setState({ name })}
            />
          </Item>
          <Item style={{ width: "70%", alignSelf: "center" }}>
            <Text style={{ color: "#fff" }}>Url</Text>
            <Input
              style={{ color: "#fff" }}
              onChangeText={url => this.setState({ url })}
            />
          </Item>

          <TouchableOpacity
            onPress={this.pick}
            style={{
              width: "70%",
              height: "50%",
              borderColor: "#ff925f",
              alignSelf: "center",
              borderRadius: 30,
              borderWidth: 1,
              borderStyle: "dashed",
              justifyContent: "center",
              marginTop: 20,
              overflow: "hidden"
            }}
          >
            <Image
              source={{
                uri: this.state.image
              }}
              style={{
                width: "100%",
                height: "100%",
                alignSelf: "center",
                borderRadius: 20
              }}
              //   resizeMode="contain"
            />
            <Icon
              style={{
                color: "#fff",
                position: "absolute",
                alignSelf: "center",
                fontSize: 40
              }}
              name="camera"
              type="Entypo"
            />
          </TouchableOpacity>
          <Button
            onPress={closeModal}
            rounded
            transparent
            style={{
              width: 60,
              height: 60,
              alignItems: "center",
              top: "5%",
              position: "absolute"
            }}
          >
            <Icon
              name="cross"
              type="Entypo"
              style={{ fontSize: 30, color: "#fff" }}
            />
          </Button>
          <Button
            onPress={this.submit}
            rounded
            warning
            style={{
              width: 70,
              height: 70,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon
              style={{ color: "#fff", fontSize: 30 }}
              name="check"
              type="FontAwesome"
            />
          </Button>
          <FlashMessage ref="ModalRef" position="top" />
        </BlurView>
      </ReactNativeModal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addWishItem: (item, closeModal, sameUser) =>
    dispatch(actionCreators.addWishItem(item, closeModal, sameUser))
});

export default connect(null, mapDispatchToProps)(AddItem);
