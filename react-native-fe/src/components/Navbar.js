import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";

const Navbar = ({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const openPostSouceScreen = () => {
    setModalVisible(false);
    navigation.navigate("PostSource");
  };

  const openStorySourceScreen = () => {
    navigation.navigate("StorySource");
  };

  return (
    <View>
      <View style={styles.navbar}>
        <Image
          source={require("../../assets/logo/highon.png")}
          style={styles.navbarLogo}
          resizeMode="contain"
        />
        <View
          style={{
            width: "60%",
          }}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={require("../../assets/icons/add_post.png")}
            style={styles.postIconNavbar}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeIconPosition}
              onPress={() => setModalVisible(false)}
            >
              <Image
                source={require("../../assets/icons/close.png")}
                style={styles.closeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.alignPostRow}>
              <Image
                source={require("../../assets/icons/add_post.png")}
                style={styles.postIcon}
                resizeMode="contain"
              />

              <TouchableOpacity onPress={() => openPostSouceScreen()}>
                <Text style={styles.textSize}>Create a post</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.horizontalRule} />
            <View style={styles.alignStoryRow}>
              <Image
                source={require("../../assets/icons/add_story.png")}
                style={styles.storyIcon}
                resizeMode="contain"
              />

              <TouchableOpacity onPress={() => openStorySourceScreen()}>
                <Text style={styles.textSize}>Create a story</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginTop: 30,
    marginBottom: -10,
  },
  navbarLogo: {
    width: 100,
    height: 40,
  },
  postIconNavbar: {
    width: 34,
    height: 34,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "90%",
    height: "25%",
    backgroundColor: "#E9E9E9",
    borderRadius: 20,
  },
  closeIconPosition: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 10,
  },
  closeIcon: {
    width: 42,
    height: 42,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  postIcon: {
    width: 32,
    height: 32,
    marginRight: 4,
  },
  storyIcon: {
    width: 40,
    height: 50,
    marginLeft: -4,
  },
  textSize: {
    fontSize: 18,
    paddingLeft: 40,
    fontWeight: "500",
    color: "#414141",
  },
  alignPostRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 20,
  },
  alignStoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 20,
  },
  horizontalRule: {
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 2,
    marginLeft: 15,
    marginRight: 40,
    height: 10,
  },
});

export default Navbar;
