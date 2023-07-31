import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

const TwoOptions = ({
  icon1,
  icon2,
  screen1,
  screen2,
  text1,
  text2,
  navigation,
}) => {
  return (
    <View>
      <View style={styles.alignPostRow}>
        <Image source={icon1} style={styles.icon} resizeMode="contain" />

        <TouchableOpacity onPress={() => screen1()}>
          <Text style={styles.textSize}>{text1}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalRule} />
      <View style={styles.alignStoryRow}>
        <Image source={icon2} style={styles.icon} resizeMode="contain" />

        <TouchableOpacity onPress={() => screen2()}>
          <Text style={styles.textSize}>{text2}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
  alignPostRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 70,
  },
  alignStoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 70,
  },
  textSize: {
    fontSize: 18,
    paddingLeft: 40,
    fontWeight: "500",
    color: "#414141",
  },
  horizontalRule: {
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 2,
    marginLeft: 20,
    marginRight: 40,
    height: 10,
  },
});

export default TwoOptions;
