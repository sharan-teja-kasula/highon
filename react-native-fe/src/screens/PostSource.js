import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";

import TwoOptions from "../components/TwoOptions";

const PostSourceScreen = ({ navigation }) => {
  const openCameraScreen = () => {
    navigation.navigate("Camera");
  };

  const openGalleryScreen = () => {
    navigation.navigate("Gallery");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backIconPosition}
        onPress={() => navigation.pop()}
      >
        <Image
          source={require("../../assets/icons/back_arrow.png")}
          style={styles.backIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TwoOptions
        icon1={require("../../assets/icons/gallery.png")}
        icon2={require("../../assets/icons/camera.png")}
        screen1={openGalleryScreen}
        screen2={openCameraScreen}
        text1="Pick from gallery"
        text2="Capture with camera"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  backIconPosition: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 40,
  },
  backIcon: {
    width: 22,
    height: 22,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
});

export default PostSourceScreen;
