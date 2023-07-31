import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

import { useRoute } from "@react-navigation/native";

import IconButton from "../components/IconButton";
import TextButton from "../components/TextButton";

import ImagePicker from "react-native-image-crop-picker";

const EditScreen = ({ navigation }) => {
  const route = useRoute();
  const [imageUri, setImageUri] = React.useState(route.params.imageUri);
  const [imageSize, setImageSize] = React.useState(null);
  const [potraitImage, setPotraitImage] = React.useState(null);
  const [landscapeImage, setLandscapeImage] = React.useState(null);
  const [currentAspectRatio, setCurrentAspectRatio] = React.useState(1);

  const popScreen = () => {
    navigation.pop();
  };

  React.useEffect(() => {
    getImageSize();
  }, []);

  const getImageSize = async () => {
    try {
      const imgSize = await new Promise((resolve, reject) => {
        Image.getSize(
          imageUri,
          (width, height) => resolve({ width, height }),
          (error) => reject(error)
        );
      });

      setImageSize(imgSize);
    } catch (error) {
      console.log("Error getting image size:", error);
    }
  };

  const cropImage = async (idx, aspectRatio) => {
    if (idx == 1) {
      setImageUri(route.params.imageUri);
      setCurrentAspectRatio(1);
      return;
    }
    if (idx == 2 && potraitImage != null) {
      setImageUri(potraitImage);
      setCurrentAspectRatio(2);
      return;
    }
    if (idx == 3 && landscapeImage != null) {
      setImageUri(landscapeImage);
      setCurrentAspectRatio(3);
      return;
    }

    let cropWidth, cropHeight;

    if (aspectRatio[0] === aspectRatio[1]) {
      cropWidth = cropHeight = Math.min(imageSize.width, imageSize.height);
    } else if (aspectRatio[0] > aspectRatio[1]) {
      cropWidth = imageSize.width;
      cropHeight = (imageSize.width * aspectRatio[1]) / aspectRatio[0];
    } else {
      cropWidth = (imageSize.height * aspectRatio[0]) / aspectRatio[1];
      cropHeight = imageSize.height;
    }

    try {
      const res = await ImagePicker.openCropper({
        cropping: false,
        path: route.params.imageUri,
        width: cropWidth,
        height: cropHeight,
      });

      setImageUri(res.path);

      if (idx === 1) {
        setCurrentAspectRatio(1);
      } else if (idx === 2) {
        setPotraitImage(res.path);
        setCurrentAspectRatio(2);
      } else {
        setLandscapeImage(res.path);
        setCurrentAspectRatio(3);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let squareStyle = null,
    potraitStyle = null,
    landScapeStyle = null,
    squareTextStyle = null,
    potraitTextStyle = null,
    landScapeTextStyle = null;

  squareStyle = StyleSheet.compose(styles.aspectRatioButton, {
    width: 50,
    height: 50,
  });
  potraitStyle = StyleSheet.compose(styles.aspectRatioButton, {
    width: 35,
    height: 50,
  });
  landScapeStyle = StyleSheet.compose(styles.aspectRatioButton, {
    width: 50,
    height: 35,
    marginTop: 7,
  });

  squareTextStyle = StyleSheet.compose(styles.aspectText, {
    color: "#7B7B7B",
  });
  potraitTextStyle = StyleSheet.compose(styles.aspectText, {
    color: "#7B7B7B",
  });
  landScapeTextStyle = StyleSheet.compose(styles.aspectText, {
    color: "#7B7B7B",
  });

  if (currentAspectRatio == 1) {
    squareStyle = StyleSheet.compose(squareStyle, {
      borderColor: "#01B2E8",
      borderWidth: 3,
    });
    squareTextStyle = StyleSheet.compose(styles.aspectText, {
      color: "#01B2E8",
    });
  } else if (currentAspectRatio == 2) {
    potraitStyle = StyleSheet.compose(potraitStyle, {
      borderColor: "#01B2E8",
      borderWidth: 3,
    });
    potraitTextStyle = StyleSheet.compose(styles.aspectText, {
      color: "#01B2E8",
    });
  } else {
    landScapeStyle = StyleSheet.compose(landScapeStyle, {
      borderColor: "#01B2E8",
      borderWidth: 3,
    });
    landScapeTextStyle = StyleSheet.compose(styles.aspectText, {
      color: "#01B2E8",
    });
  }

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
          action={() =>
            navigation.navigate("Post", {
              imageUri,
              currentAspectRatio,
              width: imageSize.width,
              height: imageSize.height,
            })
          }
          buttonBackgroundColor="#01B2E8"
        />
      </View>
      <View style={styles.picFrame}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.picFrame}>
        <Text style={styles.text}>Aspect Ratio</Text>
        <View style={styles.aspect}>
          <TouchableOpacity
            onPress={() => cropImage(1, [1, 1])}
            style={styles.alignCenter}
          >
            <View style={squareStyle} />
            <Text style={squareTextStyle}>1:1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => cropImage(2, [4, 5])}
            style={styles.alignCenter}
          >
            <View style={potraitStyle} />
            <Text style={potraitTextStyle}>4:5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => cropImage(3, [16, 9])}
            style={styles.alignCenter}
          >
            <View style={landScapeStyle} />
            <Text style={landScapeTextStyle}>16:9</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  image: {
    height: 300,
  },
  spacer: { height: 40 },
  text: { alignSelf: "center", marginBottom: 20, fontWeight: "500" },
  picFrame: {
    backgroundColor: "#EFEFEF",
    padding: 20,
  },
  aspect: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 80,
    marginRight: 80,
  },
  alignCenter: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  aspectRatioButton: {
    borderRadius: 5,
    backgroundColor: "white",
    borderWidth: 1,
  },
  aspectText: {
    marginTop: 5,
  },
});

export default EditScreen;
