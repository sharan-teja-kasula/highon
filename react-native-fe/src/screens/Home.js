import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Navbar from "../components/Navbar";
import postApi from "../apis/post";

import constants from "../constants";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [token, setToken] = React.useState("");

  React.useEffect(() => {
    const getAllPosts = async () => {
      const { statusCode, resInfo } = await postApi.getAllPosts();

      if (statusCode === 200) setPosts(resInfo.data);

      const token = await AsyncStorage.getItem("token");
      setToken(token);

      setIsLoading(false);
    };
    getAllPosts();
  }, []);

  const calculateImageDimensions = (imageProps) => {
    const windowWidth = Dimensions.get("window").width;
    const { width, height, currentAspectRatio } = imageProps;

    let imageStyle = null;

    if (currentAspectRatio === 1) {
      const aspectRatioWidth = windowWidth / 2.23;
      const aspectRatioHeight = (aspectRatioWidth / width) * height;

      imageStyle = {
        width: aspectRatioWidth,
        height: aspectRatioHeight,
        overflow: "hidden",
      };
    } else if (currentAspectRatio === 2) {
      const aspectRatioWidth = windowWidth / 2.2;
      const aspectRatioHeight = (aspectRatioWidth / 4) * 5;

      imageStyle = {
        width: aspectRatioWidth,
        height: aspectRatioHeight,
      };
    } else if (currentAspectRatio === 3) {
      const aspectRatioWidth = windowWidth / 2.2;
      const aspectRatioHeight = (aspectRatioWidth / 16) * 9;

      imageStyle = {
        width: aspectRatioWidth,
        height: aspectRatioHeight,
      };
    } else {
      const aspectRatioWidth = windowWidth / 2.2;
      const aspectRatioHeight = (aspectRatioWidth / width) * height;

      imageStyle = {
        width: aspectRatioWidth,
        height: aspectRatioHeight,
        overflow: "hidden",
      };
    }

    return imageStyle;
  };

  const renderPostItem = ({ item, index }) => {
    const url = `${constants.serverUrl}/api/post/image/${item._id}?token=${token}`;
    const imageStyle = calculateImageDimensions(item.imageProps);

    return (
      <View style={[styles.postItem, { height: imageStyle.height + 8 }]}>
        <Image
          source={{ uri: url }}
          style={[styles.postImage, imageStyle]}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#4285F4" />
          </View>
        )}
      </View>
    );
  };

  const calculateColumnLayout = () => {
    const windowWidth = Dimensions.get("window").width;
    const columnWidth = windowWidth / 2;

    let leftColumnHeight = 0;
    let rightColumnHeight = 0;
    let leftColumn = [];
    let rightColumn = [];

    posts.forEach((item, index) => {
      const imageProps = item.imageProps;
      const imageStyle = calculateImageDimensions(imageProps);

      const imageHeight = imageStyle.height + 8;

      if (leftColumnHeight <= rightColumnHeight) {
        leftColumn.push(
          <View key={index} style={[styles.postItem, { height: imageHeight }]}>
            <Image
              source={{
                uri: `${constants.serverUrl}/api/post/image/${item._id}?token=${token}`,
              }}
              style={[styles.postImage, imageStyle]}
            />
            {isLoading && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#4285F4" />
              </View>
            )}
          </View>
        );
        leftColumnHeight += imageHeight;
      } else {
        rightColumn.push(
          <View key={index} style={[styles.postItem, { height: imageHeight }]}>
            <Image
              source={{
                uri: `${constants.serverUrl}/api/post/image/${item._id}?token=${token}`,
              }}
              style={[styles.postImage, imageStyle]}
            />
            {isLoading && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#4285F4" />
              </View>
            )}
          </View>
        );
        rightColumnHeight += imageHeight;
      }
    });

    return { leftColumn, rightColumn };
  };

  const { leftColumn, rightColumn } = calculateColumnLayout();

  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <View style={{ height: 60 }} />

      <ScrollView>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <View style={{ width: "50%" }}>{leftColumn}</View>
          <View style={{ width: "50%" }}>{rightColumn}</View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
  },

  postImage: {
    borderRadius: 8,
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
});

export default HomeScreen;
