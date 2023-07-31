import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
// style={styles.text}
const SelectorInput = ({ icon, text, action, width, height }) => {
  return (
    <TouchableOpacity onPress={() => action()}>
      <View style={styles.rowSelector}>
        <Image
          source={icon}
          style={{
            width,
            height,
          }}
          resizeMode="contain"
        />
        <Text style={styles.text}>{text}</Text>

        <View style={styles.rowIcon}>
          <Image
            source={require("../../assets/icons/forward.png")}
            style={{
              width: 20,
              height: 20,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowSelector: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  text: {
    color: "#0098C6",
    fontWeight: "500",
    paddingLeft: 5,
  },
  rowIcon: {
    flex: 1,
    flexDirection: "row-reverse",
  },
});

export default SelectorInput;
