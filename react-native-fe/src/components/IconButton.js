import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

const IconButton = ({ icon, action, width, height }) => {
  return (
    <TouchableOpacity onPress={() => action()}>
      <Image
        source={icon}
        style={{
          width,
          height,
        }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default IconButton;
