import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";

const Pill = ({ iconSource, text, onPress, iconWidth, iconHeight }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.pillContainer}>
      <Image
        source={iconSource}
        style={[styles.icon, { width: iconWidth, height: iconHeight }]}
        resizeMode="contain"
      />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
    tintColor: "#000",
  },
  text: {
    fontSize: 12,
    color: "#7B7B7B",
    fontWeight: "bold",
  },
});

export default Pill;
