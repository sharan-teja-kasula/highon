import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import IconButton from "../components/IconButton";
import TextButton from "../components/TextButton";

import * as MediaLibrary from "expo-media-library";

const windowWidth = Dimensions.get("window").width;

const EditScreen = ({ navigation }) => {
  const [galleryImages, setGalleryImages] = React.useState([]);

  const popScreen = () => {
    navigation.pop();
  };

  React.useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status === "granted") {
        const mediaAssets = await MediaLibrary.getAssetsAsync({
          mediaType: [MediaLibrary.MediaType.photo],
          sortBy: [MediaLibrary.SortBy.creationTime],
        });

        setGalleryImages(mediaAssets.assets);
      }
    })();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ImageEdit", { imageUri: item.uri })}
      >
        <Image source={{ uri: item.uri }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <IconButton
          icon={require("../../assets/icons/back_arrow.png")}
          action={popScreen}
          width={22}
          height={22}
        />
        <TextButton
          text="Next"
          action={() => {}}
          buttonBackgroundColor="#707070"
        />
      </View>
      <Text style={styles.text}>Select from your gallery</Text>
      <FlatList
        data={galleryImages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={styles.images}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 40,
    alignItems: "center",
  },
  text: {
    alignSelf: "center",
    marginBottom: 20,
    fontWeight: "500",
    color: "#7B7B7B",
  },
  image: {
    width: windowWidth / 3.8,
    height: windowWidth / 3.8,
    margin: 4,
    borderRadius: 10,
  },
  images: {
    marginLeft: 30,
    marginRight: 30,
  },
});

export default EditScreen;
