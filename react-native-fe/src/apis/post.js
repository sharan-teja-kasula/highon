import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

import constants from "../constants";

const that = {};

that.addPost = async (payload, imageUri) => {
  try {
    const imageInfo = await FileSystem.getInfoAsync(imageUri);
    if (!imageInfo.exists) {
      throw new Error("Image file does not exist");
    }
    const imageUriParts = imageUri.split("/");
    const imageName = imageUriParts[imageUriParts.length - 1];
    const imageType = "image/jpeg"; // Change the type as per your image format

    const body = new FormData();
    body.append("payload", JSON.stringify(payload));
    body.append("image", {
      uri: imageUri,
      name: imageName,
      type: imageType,
    });

    const token = await AsyncStorage.getItem("token");

    const response = await fetch(constants.serverUrl + "/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
      body,
    });
    const resInfo = await response.json();

    return { statusCode: response.status, resInfo };
  } catch (error) {
    throw error;
  }
};

that.getAllPosts = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await fetch(constants.serverUrl + "/api/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const resInfo = await response.json();

    return { statusCode: response.status, resInfo };
  } catch (error) {
    throw error;
  }
};

export default that;
