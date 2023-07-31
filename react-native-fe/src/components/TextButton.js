import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const TextButton = ({ text, action, buttonBackgroundColor }) => {
  const newRoundedButton = StyleSheet.compose(styles.roundedButton, {
    backgroundColor: buttonBackgroundColor,
  });

  return (
    <TouchableOpacity onPress={() => action()} style={newRoundedButton}>
      <Text style={styles.textSize}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textSize: {
    fontSize: 16,
    color: "#fff",
  },
  roundedButton: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 20,
  },
});

export default TextButton;
