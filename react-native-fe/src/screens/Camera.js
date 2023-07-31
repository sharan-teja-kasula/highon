import React from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";

import { Camera } from "expo-camera";

import IconButton from "../components/IconButton";

const CameraScreen = ({ navigation }) => {
  const [isCamera, setCamera] = React.useState(true);
  const [hasCameraPermission, setCameraPermission] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.front);
  const cameraRef = React.useRef(null);

  React.useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
        setCamera(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const flipCamera = () => {
    if (type == Camera.Constants.Type.front)
      setType(Camera.Constants.Type.back);
    else setType(Camera.Constants.Type.front);
  };

  const confirmPicture = () => {
    navigation.navigate("ImageEdit", {
      imageUri: image,
    });
  };

  const retakePicture = () => {
    setCamera(true);
    setImage(null);
  };

  if (!hasCameraPermission)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    );

  const closeCamera = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      {isCamera ? (
        <View>
          <View style={styles.navbar}>
            <IconButton
              icon={require("../../assets/icons/back_arrow.png")}
              action={closeCamera}
              width={32}
              height={32}
            />
            <IconButton
              icon={require("../../assets/icons/flip.png")}
              action={flipCamera}
              width={42}
              height={42}
            />
          </View>
          <Camera style={styles.camera} ref={cameraRef} type={type}></Camera>
          <View style={styles.shutter}>
            <IconButton
              icon={require("../../assets/icons/shutter.png")}
              action={takePicture}
              width={58}
              height={58}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Image
            source={{ uri: image }}
            style={styles.camera}
            resizeMode="contain"
          />
          <View style={styles.confirmButtons}>
            <IconButton
              icon={require("../../assets/icons/reject.png")}
              action={retakePicture}
              width={58}
              height={58}
            />
            <IconButton
              icon={require("../../assets/icons/accept.png")}
              action={confirmPicture}
              width={58}
              height={58}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  camera: {
    height: 550,
  },
  shutter: {
    alignSelf: "center",
    marginTop: 40,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  confirmButtons: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default CameraScreen;
